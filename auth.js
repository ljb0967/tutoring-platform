const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const nodemailer = require('nodemailer');

// 이메일 전송 설정
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // 예: your-email@gmail.com
    pass: process.env.EMAIL_PASS, // Gmail 계정의 앱 비밀번호
  },
});

// exports.register = async (req, res) => {
//   try {
//     const { email, password, name, university, major } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ email, password: hashedPassword, name, university, major });
//     console.log("Saving user:", user); // 로그 추가
//     await user.save();
//     res.status(201).json({ message: '사용자 등록 성공' });
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//     console.error("Error during user registration:", error); // 로그 추가
//   }
// };

exports.register = async (req, res) => {
  try {
    
    console.log("Received registration request:", req.body); // 로그 추가
    const { email, password, name, university, major } = req.body;

    
    // 이메일 도메인 확인 (예: @university.edu만 허용)
    // if (!email.endsWith('@university.edu')) {
    //   return res.status(400).json({ error: '허용되지 않은 이메일 도메인입니다.' });
    // }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, university, major, isVerified: false });

    // 이메일 인증 토큰 생성
    const verificationToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 인증 이메일 전송
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking on the following link: 
      http://localhost:3000/api/users/verify-email?token=${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    // 유저 정보를 DB에 임시로 저장
    await user.save();
    res.status(201).json({ message: '사용자 등록 성공. 이메일 인증을 완료해주세요.' });
  } catch (error) {
    console.error("Error during registration:", error);  // 오류 로그 출력
    res.status(500).json({ error: '서버 오류' });
  }
};

// 이메일 인증 핸들러 추가
// exports.verifyEmail = async (req, res) => {
//   try {
//     const token = req.query.token;
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 이메일을 찾아서 인증 상태를 true로 업데이트
//     const user = await User.findOneAndUpdate(
//       { email: decoded.email },
//       { isVerified: true },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(400).json({ error: '사용자를 찾을 수 없습니다.' });
//     }

//     res.status(200).json({ message: '이메일 인증이 완료되었습니다.' });
//   } catch (error) {
//     res.status(500).json({ error: '서버 오류' });
//   }
// };

// exports.verifyEmail = async (req, res) => {
//   try {
//       console.log("Verify email request received:", req.query.token);  // 토큰 확인

//       const token = req.query.token;
//       if (!token) {
//           console.log("No token provided");
//           return res.status(400).json({ error: '토큰이 제공되지 않았습니다.' });
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       console.log("Decoded token:", decoded);

//       const user = await User.findOne({ email: decoded.email });
//       if (!user) {
//           console.log("Invalid user");
//           return res.status(400).json({ error: '유효하지 않은 사용자입니다.' });
//       }

//       user.isVerified = true;
//       await user.save();
//       console.log("Email verification successful");

//       res.status(200).json({ message: '이메일 인증이 성공적으로 완료되었습니다.' });
//   } catch (error) {
//       console.error("Email verification error:", error);
//       res.status(500).json({ error: '서버 오류' });
//   }
// };

exports.verifyEmail = async (req, res) => {
  try {
      console.log("Verify email request received:", req.query.token);  // 여기서 로그를 추가

      const token = req.query.token;
      if (!token) {
          console.log("No token provided");
          return res.status(400).json({ error: '토큰이 제공되지 않았습니다.' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded);

      const user = await User.findOne({ email: decoded.email });
      if (!user) {
          console.log("Invalid user");
          return res.status(400).json({ error: '유효하지 않은 사용자입니다.' });
      }

      user.isVerified = true;
      await user.save();
      console.log("Email verification successful");

      res.status(200).json({ message: '이메일 인증이 성공적으로 완료되었습니다.' });
  } catch (error) {
      console.error("Email verification error:", error);
      res.status(500).json({ error: '서버 오류' });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Received login request for:", email);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: '사용자를 찾을 수 없습니다' });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: '비밀번호가 올바르지 않습니다' });

    // Ensure that JWT_SECRET is correctly set
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not set');
    }

    // Include university in the token payload
    const token = jwt.sign(
      { userId: user._id, university: user.university },  // university 추가
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("Login successful, token generated with university");
    res.json({ token });
  } catch (error) {
    console.error("Server error during login:", error);
    res.status(500).json({ error: '서버 오류' });
  }
};


exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: '토큰이 제공되지 않았습니다.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
    req.user = user;
    console.log('Decoded user from token:', req.user); // 로그 추가
    next();
  });
};

