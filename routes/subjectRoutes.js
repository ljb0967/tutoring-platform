const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const auth = require('../auth');

// router.post('/', auth.authenticateToken, async (req, res) => {
//   try {
//     const subject = new Subject(req.body);
//     await subject.save();
//     res.status(201).json(subject);
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//   }
// });

router.post('/', auth.authenticateToken, async (req, res) => {
  try {
    // 중복 여부 확인
    const existingSubject = await Subject.findOne({ code: req.body.code });
    if (existingSubject) {
      return res.status(400).json({ error: '중복된 코드가 존재합니다.' });
    }

    // 중복이 없으면 새로 저장
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    console.error('Error occurred while saving subject:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});



// router.get('/', auth.authenticateToken, async (req, res) => {
//   try {
//     const subjects = await Subject.find({ university: req.user.university });
//     res.json(subjects);
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//   }
// });

// router.get('/', auth.authenticateToken, async (req, res) => {
//   try {
//     console.log('User Info:', req.user); // 사용자 정보 로그 출력
//     const subjects = await Subject.find({ university: req.user.university });
//     console.log('Fetched Subjects:', subjects); // 조회된 과목 로그 출력
//     res.json(subjects);
//   } catch (error) {
//     console.error('Error fetching subjects:', error); // 오류 로그 출력
//     res.status(500).json({ error: '서버 오류' });
//   }
// });

router.get('/', auth.authenticateToken, async (req, res) => {
  try {
    console.log('User university:', req.user.university); // 로그 추가
    const subjects = await Subject.find({ university: req.user.university });
    console.log('Fetched Subjects:', subjects);
    res.json(subjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    res.status(500).json({ error: '서버 오류' });
  }
});


module.exports = router;