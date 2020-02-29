const express = require('express');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/posts
    try {
        let where = {};
        if (parseInt(req.query.lastId, 10)) {
            where = {
              id : {
                  [db.Sequelize.Op.lt] : parseInt(req.query.lastId, 10), // Id가 req.query.lastId보다 작은 게시글들 limit만큼 불러오기
                }
            };
        }
        const posts = await db.Post.findAll({
            where,
            include : [
                {
                    model : db.User,
                    attributes: ['id', 'nickname'],
                },
                {
                    model : db.Comment,
                    attributes: ['id', 'content'],
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
            order: [['created_at', 'DESC']],
            limit: parseInt(req.query.limit, 10) === 0 ? null : parseInt(req.query.limit, 10),
        });
        console.log('posts', posts)
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