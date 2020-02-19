const express = require('express');
const path = require('path');
const db = require('../models');
const router = express.Router();

router.post('/', async (req, res, next) => { // POST /api/calendar
    try {
        console.log('POST /api/calendar')
        console.log('newSchedule',req.body)
        const newSchedule = await db.Calendar.create({
            title : req.body.title,
            category : req.body.category,
            start : req.body.start,
            end : req.body.end,
        });
        console.log('newSchedule',newSchedule)
        return res.json(newSchedule);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.patch('/:id/edit', async(req,res,next) => { // PATCH /api/calendar/:id/edit
    try {
        const schedule = await db.Calendar.findOne({
            where : { id : req.params.id }
        });
        const fullEditSchedule = await schedule.update(
            {
                title : req.body.title,
                category : req.body.category,
                start : req.body.start,
                end : req.body.end,
            }
        );
        console.log('fullEditSchedule',fullEditSchedule)
        return res.json(fullEditSchedule);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id/delete', async(req,res,next) => { // DELETE /api/calendar/:id/delete
    try {
        await db.Calendar.destroy({
            where : { id : req.params.id }
        });
        res.status(200).send(req.params.id);
    } catch (e) {
        console.error(e);
        return next(e);
    }
});

module.exports = router;