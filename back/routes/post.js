const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/post 
    try {
        const tags = JSON.stringify(req.body.tag.match(/#[^\s]+/g));
        console.log('req.body.tag',req.body.tag)
        console.log('tags',tags)
        const newPost = await db.Post.create({
            title : req.body.title,
            content : req.body.content,
            tag : tags,
        });
        if (tags) {
            // 태그를 전부 찾아서 #제거하고 없으면 db 추가 없으면 db 생성
            const result = await Promise.all(JSON.parse(tags).map(v => db.Tag.findOrCreate({ 
                where : { name : v.slice(1).toLowerCase()},
            })));
            console.log('result',result)
            await newPost.addTags(result.map(r => r[0]));
        }
        res.json(newPost);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:id', async (req, res, next) => { // GET /api/post/:id
    try {
        const post = await db.Post.findOne({
            where : { id : req.params.id }
        });
        res.json(post);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;