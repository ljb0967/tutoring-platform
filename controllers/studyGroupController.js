// controllers/studyGroupController.js
const StudyGroup = require('../models/StudyGroup');

exports.createStudyGroup = async (req, res) => {
  try {
    const { name, subject } = req.body;
    const studyGroup = new StudyGroup({
      name,
      subject,
      createdBy: req.user._id,
      participants: [req.user._id],
    });
    await studyGroup.save();
    res.status(201).json(studyGroup);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
};

exports.getStudyGroups = async (req, res) => {
  try {
    const studyGroups = await StudyGroup.find({ participants: req.user._id });
    res.json(studyGroups);
  } catch (error) {
    res.status(500).json({ error: '서버 오류' });
  }
};
