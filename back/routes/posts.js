const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts
    try {
        const posts = await db.Post.findAll({
            order: [['created_at', 'DESC']],
        });
        console.log('posts', posts)
        console.log('!posts', !posts)
        if (!posts) {
            return res.status(404).send('포스트가 존재하지 않습니다.');
        }
        return res.json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;