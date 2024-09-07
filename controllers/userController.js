// const multer = require('multer');
// const path = require('path');

// // Multer 설정 (파일 저장 경로와 파일 이름)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');  // 이미지를 저장할 폴더 설정
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// // 이미지 파일 필터
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//     } else {
//         cb(new Error('이미지 파일만 업로드 가능합니다.'), false);
//     }
// };

// const upload = multer({ storage, fileFilter });

// // 프로필 업데이트
// exports.updateProfile = async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const updatedData = {
//             name: req.body.name,
//             email: req.body.email,
//             university: req.body.university,
//         };

//         if (req.file) {
//             updatedData.avatar = `/uploads/${req.file.filename}`;  // 이미지 경로를 저장
//         }

//         const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ error: '프로필 업데이트 실패' });
//     }
// };

const multer = require('multer');
const path = require('path');
const User = require('../models/User');  // User 모델을 가져오는 부분


// Multer 설정 (파일 저장 경로와 파일 이름)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));  // 파일 저장 폴더
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);  // 파일 이름 설정
    }
});

const upload = multer({ storage });

exports.updateProfile = async (req, res) => {
    try {
        const avatarUrl = req.file ? `/uploads/${req.file.filename}` : req.body.avatar;

        // 유저 데이터 업데이트
        const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
            name: req.body.name,
            email: req.body.email,
            university: req.body.university,
            avatar: avatarUrl  // 이미지 경로 저장
        }, { new: true });

        res.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: '프로필 업데이트에 실패했습니다.' });
    }
};
