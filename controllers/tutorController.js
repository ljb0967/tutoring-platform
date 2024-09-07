// controllers/tutorController.js
const TutorProfile = require('../models/TutorProfile');

// exports.createTutorProfile = async (req, res) => {
//   try {
//     const { subject, hourlyRate, bio } = req.body;
//     const tutorProfile = new TutorProfile({
//       user: req.user._id,
//       subject,
//       hourlyRate,
//       bio,
//     });
//     await tutorProfile.save();
//     res.status(201).json(tutorProfile);
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//   }
// };

// 튜터 프로필 생성
// exports.createTutorProfile = async (req, res) => {
//     try {
//         const { name, university, major, subjects } = req.body;

//         const tutorProfile = new TutorProfile({
//             name,
//             university,
//             major,
//             subjects,  // 이 부분에 튜터링 가능한 과목을 포함시킴
//             createdBy: req.user.userId  // 유저와 연결
//         });

//         await tutorProfile.save();
//         res.status(201).json(tutorProfile);
//     } catch (error) {
//         console.error('Error creating tutor profile:', error);
//         res.status(500).json({ error: '서버 오류' });
//     }
// };

exports.createTutorProfile = async (req, res) => {
    try {
      const { subject, hourlyRate, bio } = req.body;  // subject와 bio가 제대로 받아지는지 확인
      const tutorProfile = new TutorProfile({
        user: req.user.userId,
        subjects: [subject],  // 배열로 전달
        hourlyRate,
        bio
      });
      await tutorProfile.save();
      res.status(201).json({ message: 'Tutor profile created successfully', tutorProfile });
    } catch (error) {
      console.error('Error creating tutor profile:', error);
      res.status(500).json({ error: 'Failed to create tutor profile' });
    }
  };
  
// exports.getTutors = async (req, res) => {
//   try {
//     const tutors = await TutorProfile.find().populate('user', 'name');
//     res.json(tutors);
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//   }
// };
// 과목에 따른 튜터 검색
exports.getTutors = async (req, res) => {
    try {
        const { subject } = req.query;  // 쿼리에서 과목을 받아옴
        // const tutors = await TutorProfile.find({ subjects: subject });  // 해당 과목의 튜터를 조회
        const tutors = await TutorProfile.find({ subjects: { $regex: new RegExp(subject, 'i') } }).populate('user', 'name email university major');
        res.json(tutors);
    } catch (error) {
        res.status(500).json({ error: '서버 오류' });
    }
};
