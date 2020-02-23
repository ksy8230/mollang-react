
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
        const tags = JSON.stringify(req.body.tag.match(/#[^\s]+/g));        
        const newPost = await db.Post.create({
            title : req.body.title,
            category : req.body.category,
            content : req.body.content,
            tag : tags,
            UserId: req.user.id,
        });
        if (tags) {
            // 태그를 전부 찾아서 #제거하고 있으면 db 찾기 없으면 db 생성
            const result = await Promise.all(JSON.parse(tags).map(v => db.Tag.findOrCreate({ 
                where : { name : v.slice(1).toLowerCase()},
            })));
            console.log('태그 result',result)
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
            const result = await db.Category.findOrCreate({
                where : { name : req.body.category }
            })
        }
        const fullPost = await db.Post.findOne({
            where : { id : newPost.id },
            include : [
                {
                    model: db.Image,
                },
                {
                    model: db.Category,
                    //as : 'PostCategory',
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
            include : [{
                model: db.Image,
            }],
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
        const tags = JSON.stringify(req.body.tag.match(/#[^\s]+/g));
        if (tags) {
            // 태그를 전부 찾아서 #제거하고 있으면 db 찾기 없으면 db 생성
            const result = await Promise.all(JSON.parse(tags).map(v => db.Tag.findOrCreate({ 
                where : { name : v.slice(1).toLowerCase()},
            })));
            console.log('result',result)
            await post.addTags(result.map(r => r[0]));
        }
        if(!post) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        console.log('req.body',req.body)
        const fullEditPost = await post.update(
            { 
                content : req.body.content,
                title : req.body.title,
                tag : tags,
            }
        );
        console.log('fullEditPost',fullEditPost)
        return res.json(fullEditPost);
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

module.exports = router;