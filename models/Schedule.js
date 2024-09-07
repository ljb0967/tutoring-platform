const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 사용자와 연관
    studyGroupId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup' }, // 스터디 그룹과 연관 (선택사항)
});

module.exports = mongoose.model('Schedule', scheduleSchema);