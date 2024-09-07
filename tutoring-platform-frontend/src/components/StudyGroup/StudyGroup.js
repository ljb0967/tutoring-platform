import React, { useState } from 'react';
import axios from 'axios';

function StudyGroup() {
    const [name, setName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/api/study-groups/create', 
            { name, subjectCode },
            { headers: { 'Authorization': `Bearer ${token}` } });
            console.log('Study group created:', response.data);
        } catch (error) {
            console.error(error.response.data.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Group Name" />
            <input type="text" value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} placeholder="Subject Code" />
            <button type="submit">Create Study Group</button>
        </form>
    );
}

export default StudyGroup;
