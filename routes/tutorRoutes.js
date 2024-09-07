// routes/tutorRoutes.js
const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const auth = require('../auth');

router.post('/create', auth.authenticateToken, tutorController.createTutorProfile);
// router.get('/', auth.authenticateToken, tutorController.getTutors);

router.get('/', auth.authenticateToken, (req, res, next) => {
    next();
  }, tutorController.getTutors);

  
// router.get('/', auth.authenticateToken, async (req, res) => {
//     try {
//       const { subject } = req.query; // 쿼리 파라미터에서 subject 가져오기
//     //   const filter = subject ? { subjects: { $in: [subject] } } : {}; // 과목 필터링
//       const filter = subject ? { subjects: { $regex: new RegExp(subject, 'i') } } : {}; 
//       const tutors = await TutorProfile.find(filter).populate('user', 'name email');
//       res.json(tutors);
//     } catch (error) {
//       res.status(500).json({ error: '서버 오류' });
//     }
//   });

module.exports = router;
