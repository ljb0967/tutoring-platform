// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const auth = require("../auth");

// router.post("/register", auth.register);
// router.post("/login", auth.login);

// router.get("/profile", auth.authenticateToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.userId).select("-password");
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: "서버 오류" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Subject = require('../models/Subject');
const auth = require("../auth");
const userController = require('../controllers/userController');
const multer = require('multer');


// 사용자 등록 엔드포인트 (이메일 인증 포함)
router.post("/register", auth.register);

// 사용자 로그인 엔드포인트
router.post("/login", auth.login);

// 사용자 이메일 인증 엔드포인트
router.get("/verify-email", auth.verifyEmail);

// 사용자가 자신의 프로필에 과목 추가
// router.post('/enroll-subject', auth.authenticateToken, async (req, res) => {
//   try {
//     const subject = await Subject.findOne({ code: req.body.code });
//     if (!subject) {
//       return res.status(404).json({ error: '과목을 찾을 수 없습니다.' });
//     }

//     const user = await User.findById(req.user.userId);
//     if (!user.enrolledSubjects.includes(subject._id)) {
//       user.enrolledSubjects.push(subject._id);
//       await user.save();
//     }

//     res.json({ message: '과목이 추가되었습니다.', enrolledSubjects: user.enrolledSubjects });
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//   }
// });

// 관심 과목 추가
router.post('/enroll-subject', auth.authenticateToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.userId);
      user.enrolledSubjects.push(req.body.code);
      await user.save();
      res.status(201).json(user.enrolledSubjects);
  } catch (error) {
      res.status(500).json({ error: '서버 오류' });
  }
});

// 관심 과목 목록 가져오기
router.get('/enroll-subjects', auth.authenticateToken, async (req, res) => {
  try {
      const user = await User.findById(req.user.userId);
      res.json(user.enrolledSubjects);
  } catch (error) {
      res.status(500).json({ error: '서버 오류' });
  }
});

// 사용자 프로필 조회 엔드포인트 (토큰 인증 필요)
router.get("/profile", auth.authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password"); // 과목 정보와 함께 사용자 프로필 조회
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "서버 오류" });
  }
});

// 사용자 프로필 업데이트하기
// router.put('/profile', auth.authenticateToken, async (req, res) => {
//   try {
//       const { name, university, major } = req.body;
//       const user = await User.findByIdAndUpdate(
//           req.user.userId,
//           { name, university, major },
//           { new: true }
//       ).select('-password');
//       res.json(user);
//   } catch (error) {
//       res.status(500).json({ error: '서버 오류' });
//   }
// });

const upload = multer({ dest: 'uploads/' });  // 파일을 저장할 경로 설정

// 프로필 업데이트 라우트
router.put('/profile', auth.authenticateToken, upload.single('avatar'), userController.updateProfile);

module.exports = router;

