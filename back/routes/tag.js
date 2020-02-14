const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/:tag', async (req, res, next) => { // GET /api/tag/:tag
    try {
        let where = [];
        if (parseInt(req.query.lastId, 10)) {
            where = {
              id : {
                  [db.Sequelize.Op.lt] : parseInt(req.query.lastId, 10), // Id가 req.query.lastId보다 작은 게시글들 limit만큼 불러오기
                }
            };
        }
        const posts = await db.Post.findAll({
            where,
            include: [{
              model: db.Tag,
              where: { name: decodeURIComponent(req.params.tag) },
            }, {
                model: db.Image,
            }],
            order: [['created_at', 'DESC']],
            limit: parseInt(req.query.limit, 10),
        });
        res.json(posts);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;