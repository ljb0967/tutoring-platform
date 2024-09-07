import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

function SendMessage() {
    const { tutorId } = useParams();
    const location = useLocation();
    const { subject } = location.state || {};  // 과목 정보 가져오기
    // const [content, setContent] = useState(subject ? `과목: ${subject}\n` : '');  // 기본 메시지에 과목 
    // 포함
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            console.log("Sending message to:", tutorId);  // 전송할 튜터 ID 확인
            await axios.post('http://localhost:3000/api/messages/send', 
                { receiverId: tutorId, content, subject}, 
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('메시지가 성공적으로 전송되었습니다.');
        } catch (error) {
            console.error('Error sending message:', error);
            setMessage('메시지 전송 실패. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            <h2>메시지 보내기</h2>
            <form onSubmit={handleSubmit}>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="메시지를 입력하세요" 
                    required 
                />
                <button type="submit">전송</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SendMessage;
