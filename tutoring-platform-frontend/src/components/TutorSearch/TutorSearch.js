import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';  // useNavigate 추가
import './TutorSearch.css';  // 스타일 추가

function TutorSearch() {
    const [subject, setSubject] = useState('');
    const [tutors, setTutors] = useState([]);

    const navigate = useNavigate();  // useNavigate 훅을 사용해 페이지 이동

    const handleSearch = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');  // 토큰 가져오기
        try {
            const response = await axios.get(`http://localhost:3000/api/tutors?subject=${subject}`, {
                headers: {
                    Authorization: `Bearer ${token}`  // Authorization 헤더에 토큰 추가
                }
            });
            setTutors(response.data);
        } catch (error) {
            console.error('Failed to fetch tutors', error);
        }
    };
    
    const handleRequest = (tutorId, tutorSubject) => {
        // `/send-message/:tutorId`로 이동 시 과목 정보도 같이 전달
        navigate(`/send-message/${tutorId}`, { state: { subject: tutorSubject } });
    };

    return (
        <div className="tutor-search-container">
            <h2>튜터 검색</h2>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                    placeholder="과목명을 입력하세요" 
                />
                <button type="submit">검색</button>
            </form>
            <ul>
                {tutors.length > 0 ? (
                    tutors.map(tutor => (
                        <li key={tutor._id}>
                            {tutor.user.name} {tutor.user.university} {tutor.user.major} - {tutor.subjects.join(', ')}(시급: {tutor.hourlyRate}만원)
                            <button onClick={() => handleRequest(tutor.user._id, tutor.subjects.join(', '))} className="send-message-btn">요청</button>
                        </li>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </ul>
        </div>
    );
}

export default TutorSearch;
