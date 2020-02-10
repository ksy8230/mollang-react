const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async (req, res, next) => { // GET /api/tag/:tag
    try {
        const posts = await db.Post.findAll({
            include: [{
              model: db.Tag,
              where: { name: decodeURIComponent(req.params.tag) },
            }],
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;