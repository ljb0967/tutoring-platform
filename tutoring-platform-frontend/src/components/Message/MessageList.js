import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './MessageList.css';  // 스타일 파일 추가

function MessageList() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/api/messages', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Response:", response);  // 확인
                setMessages(response.data);
            } catch (error) {
                console.error('메시지를 가져오는 데 실패했습니다.', error);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div className="message-list-container">
            <h2>📬 메시지 목록</h2>
            {messages.length > 0 ? (
                <ul className="message-list">
                    {messages.map(message => (
                        <li key={message._id} className="message-card">
                            <div className="message-header">
                                <span className="message-subject">{message.subject}</span>
                                <Link to={`/message/${message._id}`} className="message-sender">
                                    {message.sender.name} 님
                                </Link>
                            </div>
                            <p className="message-content">{message.content}</p>
                            <div className="message-timestamp">
                                보낸 시각: {new Date(message.timestamp).toLocaleString()}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>아직 받은 메시지가 없습니다.</p>
            )}
        </div>
    );
}

export default MessageList;
