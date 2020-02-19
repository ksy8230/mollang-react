const express = require('express');
const path = require('path');
const db = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => { // GET /api/calendars
    try {
        const schedules = await db.Calendar.findAll({
        });
        console.log('schedules',schedules)
        if (!schedules) {
            return res.status(404).send('스케줄이 존재하지 않습니다.');
        }
        return res.json(schedules);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;