// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Dashboard/Profile';
import StudyGroup from './components/StudyGroup/StudyGroup';
import StudyGroupList from './components/StudyGroup/StudyGroupList';
import Schedule from './components/Schedule/Schedule';
import ScheduleList from './components/Schedule/ScheduleList';
import TutorRegister from './components/Tutor/TutorRegister';  // 튜터 등록 컴포넌트 추가
import TutorSearch from './components/TutorSearch/TutorSearch';  // 튜터 검색 페이지 추가
import SendMessage from './components/Tutor/SendMessage';
import MessageList from './components/Message/MessageList';  // MessageList 컴포넌트 가져오기

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/study-group" element={<StudyGroup />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/study-group" element={<StudyGroup />} />
                    <Route path="/study-groups" element={<StudyGroupList />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/schedules" element={<ScheduleList />} />
                    <Route path="/tutor-register" element={<TutorRegister />} />
                    <Route path="/tutor-search" element={<TutorSearch />} />
                    <Route path="/send-message/:tutorId" element={<SendMessage />} />
                    <Route path="/messages" element={<MessageList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

