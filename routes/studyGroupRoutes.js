
// // routes/studyGroupRoutes.js
// const express = require('express');
// const router = express.Router();
// const StudyGroup = require('../models/StudyGroup');
// const Subject = require('../models/Subject');
// const auth = require('../auth');

// // 스터디 그룹 생성
// // router.post('/', auth.authenticateToken, async (req, res) => {
// //   try {
// //     const { name, description, subject, maxMembers } = req.body;
// //     const studyGroup = new StudyGroup({
// //       name,
// //       description,
// //       subject,
// //       creator: req.user.userId,
// //       members: [req.user.userId],
// //       maxMembers
// //     });
// //     await studyGroup.save();
// //     res.status(201).json(studyGroup);
// //   } catch (error) {
// //     res.status(500).json({ error: '서버 오류' });
// //   }
// // });

// router.post('/create', auth.authenticateToken, async (req, res) => {
//   try {
//     const { name, subjectCode } = req.body;

//     const subject = await Subject.findOne({ code: subjectCode });
//     if (!subject) {
//       return res.status(404).json({ error: '해당 과목을 찾을 수 없습니다.' });
//     }

//     const studyGroup = new StudyGroup({
//       name,
//       subject: subject._id,
//       createdBy: req.user.userId
//     });

//     studyGroup.participants.push(req.user.userId);
//     await studyGroup.save();

//     res.status(201).json(studyGroup);
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//   }
// });

// // router.post('/create', auth.authenticateToken, async (req, res) => {
// //   try {
// //       const { name, subjectCode } = req.body;
// //       const studyGroup = new StudyGroup({ name, subjectCode, members: [req.user.userId] });
// //       await studyGroup.save();
// //       res.status(201).json(studyGroup);
// //   } catch (error) {
// //       res.status(500).json({ error: '서버 오류' });
// //   }
// // });

// // 모든 스터디 그룹 조회
// // router.get('/', auth.authenticateToken, async (req, res) => {
// //   try {
// //     const studyGroups = await StudyGroup.find().populate('subject', 'name');
// //     res.json(studyGroups);
// //   } catch (error) {
// //     res.status(500).json({ error: '서버 오류' });
// //   }
// // });

// // 특정 스터디 그룹 조회
// // router.get('/:id', auth.authenticateToken, async (req, res) => {
// //   try {
// //     const studyGroup = await StudyGroup.findById(req.params.id).populate('subject', 'name').populate('members', 'name');
// //     if (!studyGroup) return res.status(404).json({ error: '스터디 그룹을 찾을 수 없습니다' });
// //     res.json(studyGroup);
// //   } catch (error) {
// //     res.status(500).json({ error: '서버 오류' });
// //   }
// // });

// router.get('/my-groups', auth.authenticateToken, async (req, res) => {
//   try {
//     const studyGroups = await StudyGroup.find({ participants: req.user.userId }).populate('subject');
//     res.json(studyGroups);
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//   }
// });

// // 스터디 그룹 참여
// // router.post('/:id/join', auth.authenticateToken, async (req, res) => {
// //   try {
// //     const studyGroup = await StudyGroup.findById(req.params.id);
// //     if (!studyGroup) return res.status(404).json({ error: '스터디 그룹을 찾을 수 없습니다' });
// //     if (studyGroup.members.includes(req.user.userId)) return res.status(400).json({ error: '이미 참여 중인 그룹입니다' });
// //     if (studyGroup.members.length >= studyGroup.maxMembers) return res.status(400).json({ error: '그룹 인원이 가득 찼습니다' });
    
// //     studyGroup.members.push(req.user.userId);
// //     await studyGroup.save();
// //     res.json(studyGroup);
// //   } catch (error) {
// //     res.status(500).json({ error: '서버 오류' });
// //   }
// // });
// router.post('/join', auth.authenticateToken, async (req, res) => {
//   try {
//     const { groupId } = req.body;

//     const studyGroup = await StudyGroup.findById(groupId);
//     if (!studyGroup) {
//       return res.status(404).json({ error: '스터디 그룹을 찾을 수 없습니다.' });
//     }

//     if (!studyGroup.participants.includes(req.user.userId)) {
//       studyGroup.participants.push(req.user.userId);
//       await studyGroup.save();
//     }

//     res.json({ message: '스터디 그룹에 참가하였습니다.', studyGroup });
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//   }
// });

// module.exports = router;

// routes/studyGroupRoutes.js
const express = require('express');
const router = express.Router();
const studyGroupController = require('../controllers/studyGroupController');
const auth = require('../auth');

router.post('/create', auth.authenticateToken, studyGroupController.createStudyGroup);
router.get('/my-groups', auth.authenticateToken, studyGroupController.getStudyGroups);

module.exports = router;
