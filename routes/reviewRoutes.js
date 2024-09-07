const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const auth = require('../auth');

// 리뷰 작성
router.post('/', auth.authenticateToken, async (req, res) => {
  try {
    const { subjectId, tutorId, rating, comment } = req.body;
    const review = new Review({
      userId: req.user.userId,
      subjectId,
      tutorId,
      rating,
      comment,
    });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
});

// 특정 과목에 대한 리뷰 조회
router.get('/subject/:subjectId', auth.authenticateToken, async (req, res) => {
  try {
    const reviews = await Review.find({ subjectId: req.params.subjectId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
});

// 특정 튜터에 대한 리뷰 조회
router.get('/tutor/:tutorId', auth.authenticateToken, async (req, res) => {
  try {
    const reviews = await Review.find({ tutorId: req.params.tutorId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;
