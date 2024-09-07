const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const auth = require('../auth');

// 일정 생성
router.post('/create', auth.authenticateToken, async (req, res) => {
    try {
        const { title, description, date, studyGroupId } = req.body;
        const schedule = new Schedule({
            title,
            description,
            date,
            userId: req.user.userId,
            studyGroupId: studyGroupId || null,
        });
        await schedule.save();
        res.status(201).json(schedule);
    } catch (error) {
        res.status(500).json({ error: '서버 오류' });
    }
});

// 일정 조회
router.get('/', auth.authenticateToken, async (req, res) => {
    try {
        const schedules = await Schedule.find({ userId: req.user.userId });
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: '서버 오류' });
    }
});

// 일정 수정
router.put('/:id', auth.authenticateToken, async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule || schedule.userId.toString() !== req.user.userId) {
            return res.status(404).json({ error: '일정을 찾을 수 없습니다' });
        }
        Object.assign(schedule, req.body);
        await schedule.save();
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ error: '서버 오류' });
    }
});

// 일정 삭제
router.delete('/:id', auth.authenticateToken, async (req, res) => {
    try {
        const schedule = await Schedule.findById(req.params.id);
        if (!schedule || schedule.userId.toString() !== req.user.userId) {
            return res.status(404).json({ error: '일정을 찾을 수 없습니다' });
        }
        await schedule.deleteOne();
        res.json({ message: '일정이 삭제되었습니다.' });
    } catch (error) {
        res.status(500).json({ error: '서버 오류' });
    }
});

module.exports = router;