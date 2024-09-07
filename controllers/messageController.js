// controllers/messageController.js
const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ receiver: req.user.userId }).populate('sender', 'name');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: '메시지 목록을 가져오는 데 실패했습니다.' });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        console.log("Request body:", req.body);  // req.body 확인
        const { receiverId, content, subject } = req.body;
        if (!receiverId || !content || !subject) {
            throw new Error("필수 데이터가 누락되었습니다.");
        }
        const message = new Message({
            sender: req.user.userId,
            receiver: receiverId,
            content: content,
            subject: subject,
            timestamp: Date.now(),
        });
        await message.save();
        res.status(201).json({ message: '메시지가 성공적으로 전송되었습니다.' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: '메시지 전송에 실패했습니다.' });
    }
};
