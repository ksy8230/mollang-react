
const express = require('express');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const db = require('../models');
const router = express.Router();

AWS.config.update({
    region : 'ap-northeast-2',
    accessKeyId : process.env.S3_ACCESS_KEY_ID,
    secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
});

const upload = multer({
    storage : multerS3({
        // aws s3 서버용
        s3 : new AWS.S3(),
        bucket : 'mollog',
        key(req, file, cb) {
            cb(null, `original/${+new Date()}${path.basename(file.originalname)}`);
        },
        // 로컬 백엔드 서버용
        // destination(req, file, done) {
        //     done(null, 'uploads');
        // },
        // filename(req, file, done) {
        //     const ext = path.extname(file.originalname);
        //     const basename = path.basename(file.originalname, ext);
        //     done(null, basename + new Date().valueOf() + ext); // 파일명이 같아 덮어지는 걸 막기 위해 파일명+날짜
        // },
    }),
    limits : { fileSize : 20 * 1024 * 1024 },
});

router.post('/', upload.none(), async (req, res, next) => { // POST /api/post 
    try {
        console.log('req.body.tag',req.body.tag)  
        //console.log('req.user.id',req.user.id)  
        const tags = JSON.stringify(req.body.tag.match(/#[^\s]+/g)); 
        const newPost = await db.Post.create({
            title : req.body.title,
            category : req.body.category,
            content : req.body.content,
            tag : tags,
            //UserId: req.user.id,
        });

        if (req.body.tag !== '') {
            // req.body.tag 값이 '' 이 아니면
            // 태그를 전부 찾아서 #제거하고 있으면 db 찾기 없으면 db 생성
            const result = await Promise.all(JSON.parse(tags).map(v => db.Tag.findOrCreate({ 
                where : { name : v.slice(1).toLowerCase()},
            })));
            await newPost.addTags(result.map(r => r[0]));
        } 
        if (req.body.thumbimage) { // multer에서 이미지 주소를 여러개 올리면 thumbimage : [주소1, 주소2...]
            if (Array.isArray(req.body.thumbimage)) {
                const thumbimages = await Promise.all(req.body.thumbimage.map((image)=> {
                    return db.Image.create({ src : image });
                }));
                await newPost.addImages(thumbimages);
            } else { // 이미지 주소 하나면 thumbimage : 주소1
                const thumbimage = await db.Image.create({ src : req.body.thumbimage });
                await newPost.addImage(thumbimage);
            }
        }
        if (req.body.category) {
            // category가 요청 들어왔을 때 디비에 category가 있으면 찾고 없으면 db 생성
            await db.Category.findOrCreate({
                where : { name : req.body.category }
            })
        }
        const fullPost = await db.Post.findOne({
            where : { id : newPost.id },
            include : [
                {
                    model: db.User,
                },
                {
                    model: db.Image,
                },
                {
                    model : db.Comment,
                },
                {
                    model: db.Category,
                    attributes: ['id'],
                },
            ]
        })
        res.json(fullPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:id', async (req, res, next) => { // GET /api/post/:id
    try {
        const post = await db.Post.findOne({
            where : { id : req.params.id },
            include: [
                {
                    model: db.User,
                    attributes: ['id', 'nickname'],
                },
                {
                    model : db.Comment,
                    include : [
                        {
                            model: db.User,
                            attributes: ['id', 'nickname'],
                        },
                    ]
                },
                {
                    model : db.Image,
                }
            ],
        });
        res.json(post);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.patch('/:id/edit', async(req, res, next) => { // PATCH /api/post/:id/edit
    try {
        const post = await db.Post.findOne({
            where : { id : req.params.id }
        });
        if(!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        if (req.body.tag === '') {
            const fullEditPost = await post.update(
                { 
                    content : req.body.content,
                    title : req.body.title,
                    tag : '',
                }
            );
            return res.json(fullEditPost);
        } else {
            const tags = JSON.stringify(req.body.tag.match(/#[^\s]+/g));
            const result = await Promise.all(JSON.parse(tags).map(v => db.Tag.findOrCreate({ 
                where : { name : v.slice(1).toLowerCase()},
            })));
            await post.addTags(result.map(r => r[0]));
            const fullEditPost = await post.update(
                { 
                    content : req.body.content,
                    title : req.body.title,
                    tag : tags,
                }
            );
            return res.json(fullEditPost);
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id/delete', async (req, res, next) => {
    try {
        // const post = await db.Post.findOne({ where : { id : req.params.id }});
        await db.Post.destroy({ where : { id : req.params.id } });
        await db.Tag.destroy({
            include: [{
                models : db.Posttag,
                where : { post_id : req.params.id }
            }]
        })
        res.send(req.params.id); 
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

// array, fields, single, none 메서드
router.post('/images', upload.array('image'), (req, res) => {
    // aws s3 서버용
    res.json(req.files.map(v => v.location));
    // 로컬 백엔드 서버용
    // res.json(req.files.map(v => v.filename));
});

router.post('/thumbimage', upload.array('thumbimage'), (req, res, next) => {
    try {
        // aws s3 서버용
        res.json(req.files.map(v => v.location));
        // 로컬 백엔드 서버용
        // res.json(req.files.map(v => v.filename));
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.post('/detail/:id/comment', async (req, res, next) => { // POST /api/post/:id/comment
    try {
        const post = await db.Post.findOne({ where : { id : req.params.id }});
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const newComment = await db.Comment.create({
            PostId : post.id,
            UserId : req.user.id,
            content : req.body.content,
        });
        await post.addComment(newComment.id);
        const comment = await db.Comment.findOne({
            where : {
                id : newComment.id,
            },
            include : [{
                model : db.User,
                attributes : ['id', 'nickname'],
            }],
        })
        return res.json(comment);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

router.get('/detail/:id/comments', async(req,res,next) => {
    try {
        const post = await db.Post.findOne({ where : { id : req.params.id }});
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comments = await db.Comment.findAll({
            where : {
                PostId : req.params.id,
            },
            order : [['createdAt', 'DESC']], 
            include : [
                {
                    model : db.User,
                    attributes : ['id', 'nickname'],
                },
            ],
        });
        res.json(comments);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.patch('/detail/:id/comments/:commentId/edit', async(req,res,next) => {
    try {
        const post = await db.Post.findOne({ where : { id : req.params.id }});
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const comment = await db.Comment.findOne({ where : { id : req.params.commentId }});
        console.log('comment reqbody', req.body)
        const editComment = await comment.update({
            content : req.body.content,
        });
        return res.json(editComment);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

router.delete('/detail/:id/comments/:commentId/delete', async(req,res,next) => {
    try {
        const post = await db.Post.findOne({ where : { id : req.params.id }});
        if (!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        const deleteComment = await db.Comment.findOne({ where : { id : req.params.commentId }});
        await post.removeComment(deleteComment.id);
        await db.Comment.destroy({ where : { id : req.params.commentId } });
        res.send(req.params.commentId);
    } catch(e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;