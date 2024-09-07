import React, { useState } from 'react';
import axios from 'axios';

function Schedule() {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:3000/api/schedules/create', { description, date }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Schedule created:', response.data);
        } catch (error) {
            console.error('Failed to create schedule', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <button type="submit">Create Schedule</button>
        </form>
    );
}

export default Schedule;
