const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    subject: { type: String, required: true },  // 과목 정보 추가
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', messageSchema);


// models/Message.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const messageSchema = new Schema({
//     sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Message', messageSchema);
