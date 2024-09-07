// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function Profile() {
//     const [profile, setProfile] = useState({
//         name: '',
//         university: '',
//         major: ''
//     });

//     useEffect(() => {
//         // 사용자 프로필 가져오기
//         const fetchProfile = async () => {
//             const token = localStorage.getItem('token');
//             try {
//                 const response = await axios.get('http://localhost:3000/api/users/profile', {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setProfile(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch profile', error);
//             }
//         };
//         fetchProfile();
//     }, []);

//     const handleChange = (e) => {
//         setProfile({ ...profile, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');
//         try {
//             const response = await axios.put('http://localhost:3000/api/users/profile', profile, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setProfile(response.data);
//             alert('프로필이 성공적으로 업데이트되었습니다.');
//         } catch (error) {
//             console.error('Failed to update profile', error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Name" />
//             <input type="text" name="university" value={profile.university} onChange={handleChange} placeholder="University" />
//             <input type="text" name="major" value={profile.major} onChange={handleChange} placeholder="Major" />
//             <button type="submit">Update Profile</button>
//         </form>
//     );
// }

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'; // 스타일 추가

function Profile() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        university: '',
        avatar: ''  // 프로필 이미지 URL 추가
    });
    const [selectedImage, setSelectedImage] = useState(null);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    

    const handleProfileUpdate = async () => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('name', profile.name);
        formData.append('email', profile.email);
        formData.append('university', profile.university);
        if (selectedImage) {
            formData.append('avatar', selectedImage);  // 이미지 파일 추가
        }
    
        try {
            const response = await axios.put('http://localhost:3000/api/users/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data);
            alert('프로필이 성공적으로 업데이트되었습니다.');  // 성공 메시지 표시
        } catch (error) {
            console.error('프로필 업데이트 실패', error);
        }
    };
    

    return (
        <div className="profile-container">
            <h1>{profile.name}님의 프로필</h1>
            <img src={profile.avatar ? `http://localhost:3000${profile.avatar}` : 'https://via.placeholder.com/150'} alt="프로필 이미지" className="profile-avatar"/>

            <input type="file" accept="image/*" onChange={handleImageChange} />
    
            <div className="profile-info">
                <label>이름</label>
                <input 
                    type="text" 
                    value={profile.name} 
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
                <label>학교</label>
                <input 
                    type="text" 
                    value={profile.university} 
                    onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                />
                <label>이메일</label>
                <input 
                    type="email" 
                    value={profile.email} 
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
            </div>
    
            <button onClick={handleProfileUpdate}>프로필 업데이트</button>
        </div>
    );
    
}

export default Profile;


