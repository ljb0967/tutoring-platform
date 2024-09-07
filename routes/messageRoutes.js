// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const auth = require('../auth');
const messageController = require('../controllers/messageController');


// router.post('/send', auth.authenticateToken, async (req, res) => {
//     try {
//         const { receiverId, content } = req.body;
//         const message = new Message({
//             sender: req.user._id,
//             receiver: receiverId,
//             content
//         });
//         await message.save();
//         res.status(201).json({ message: 'Message sent successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to send message' });
//     }
// });

// 메시지 목록 조회
router.get('/', auth.authenticateToken, messageController.getMessages);

// 메시지 전송
router.post('/send', auth.authenticateToken, messageController.sendMessage);


module.exports = router;
