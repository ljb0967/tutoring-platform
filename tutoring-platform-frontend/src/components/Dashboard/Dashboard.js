// import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function Dashboard() {
//     return (
//         <div className="dashboard-container">
//             <h1>Welcome, [사용자 이름]</h1>
//             <p>Email: [사용자 이메일]</p>
//             <p>University: [사용자 대학]</p>
//             <div>
//                 <Link to="/profile">Profile</Link>
//                 <Link to="/study-groups">Study Groups</Link>
//                 <Link to="/schedules">Schedules</Link>
//             </div>
//         </div>
//     );
// }

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        university: '',
        avatar: 'https://via.placeholder.com/80'  // 기본 프로필 이미지 추가
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Failed to fetch profile', error);
            }
        };
        fetchProfile();
    }, []);

    return (
        <div className="dashboard-container">
            <img src={profile.avatar ? `http://localhost:3000${profile.avatar}` : 'https://via.placeholder.com/150'} alt="프로필 이미지" />
            <h1>안녕하세요, {profile.name}님</h1>
            <p>이메일: {profile.email}</p>
            <p>대학교: {profile.university}</p>
            <nav>
                <Link to="/profile">내 프로필</Link>
                <Link to="/study-group">스터디 목록</Link>
                <Link to="/schedules">나의 스케쥴</Link>
                <Link to="/messages">메시지 목록</Link>
            </nav>
            <div className="dashboard-actions">
                <button onClick={() => navigate('/tutor-register')} className="tutor-register-btn">
                    튜터 프로필 생성하기
                </button>
                <button onClick={() => navigate('/tutor-search')} className="tutor-search-btn">
                    튜터 검색하기
                </button>
            </div>
        </div>
    );
}

export default Dashboard;


