// const mongoose = require('mongoose');

// // 이미 존재하는 모델을 가져오거나, 새로운 모델을 정의합니다.
// // const StudyGroup = mongoose.models.StudyGroup || mongoose.model('StudyGroup', new mongoose.Schema({
// //   name: { type: String, required: true },
// //   description: { type: String },
// //   members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
// //   createdAt: { type: Date, default: Date.now },
// // }));

// // module.exports = StudyGroup;

// const studyGroupSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
//   participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // 참가자들
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // 그룹 생성자
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('StudyGroup', studyGroupSchema);


// models/StudyGroup.js
const mongoose = require('mongoose');

const StudyGroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StudyGroup', StudyGroupSchema);
