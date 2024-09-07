// const mongoose = require('mongoose');

// const TutorProfileSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     subjects: [String],  // 튜터 가능한 과목들
//     hourlyRate: Number,  // 시간당 교습료
//     description: String,  // 자기소개
//     availableTimes: [String],  // 가능한 시간대들
// });

// module.exports = mongoose.model('TutorProfile', TutorProfileSchema);

const mongoose = require('mongoose');

const tutorProfileSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subjects: [{ type: String, required: true }],  // subjects 필드 추가
    hourlyRate: { type: Number, required: true },
    bio: { type: String, required: true },  // bio 필드 추가
    availableTimes: [{ type: String }]
});

module.exports = mongoose.model('TutorProfile', tutorProfileSchema);

