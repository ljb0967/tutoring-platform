const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const userRoutes = require('./routes/userRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const studyGroupRoutes = require('./routes/studyGroupRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes'); // 일정 관리 라우트 추가
const reviewRoutes = require('./routes/reviewRoutes');
const tutorRoutes = require('./routes/tutorRoutes');  // 튜터 라우트 추가
const messageRoutes = require('./routes/messageRoutes');


const app = express();
app.use(express.json());
// app.use(express.json({ type: 'application/json; charset=utf-8' }));



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// #################################################

// const customerSchema = mongoose.Schema({
//   name : "string",
//     age : "number",
//     gender : "string"
// }, {
//   collection : "newCustomer"
// });

// const Customer = mongoose.model("Customer", customerSchema);

// const customer1 = new Customer({ name: "가나다", age: 23, gender: "남성" });

// customer1.save()
//   .then(() => console.log("Customer saved"))
//   .catch(err => console.error("Error saving customer:", err));

// ###############################################################

app.use(cors({
  origin: 'http://localhost:3001', // 프론트엔드가 동작하는 주소를 명확히 지정
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 허용할 HTTP 메소드
  credentials: true, // 쿠키를 포함한 요청 허용
}));
app.use('/api/users', userRoutes);
app.use('/api/study-groups', studyGroupRoutes);
app.use('/api/schedules', scheduleRoutes); // 일정 관리 라우트 추가
app.use('/api/subjects', subjectRoutes);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/reviews', reviewRoutes);
app.use('/api/tutors', tutorRoutes);  // 튜터 라우트 추가
app.use('/api/messages', messageRoutes);
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));  // 업로드된 파일들을 정적으로 제공


// app.use(cors({
//   origin: 'http://localhost:3001', // 리액트 앱이 실행되는 포트를 여기에 적어줍니다.
//   credentials: true,
// }));


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // 메시지 수신 및 브로드캐스트
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));