const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:series', async (req, res, next) => { // GET /api/series/:series
    try {
        const posts = await db.Post.findAll({
            where : {
                category : decodeURIComponent(req.params.series)
            },
            include: [{
                model: db.Image,
            }],
            order: [['created_at', 'DESC']],
        });
        console.log(posts)
        return res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;