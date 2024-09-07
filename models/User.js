const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  university: { type: String, required: true },
  major: { type: String, required: true },
  isVerified: { type: Boolean, default: false },  // 이메일 인증 여부
  enrolledSubjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  avatar: { type: String },  // 프로필 이미지 URL 필드 추가
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);