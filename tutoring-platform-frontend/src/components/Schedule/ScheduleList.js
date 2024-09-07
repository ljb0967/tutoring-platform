import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ScheduleList() {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/schedules', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSchedules(response.data);
        };

        fetchSchedules();
    }, []);

    return (
        <div>
            <h2>Your Schedules</h2>
            <ul>
                {schedules.map(schedule => (
                    <li key={schedule._id}>
                        {schedule.date} - {schedule.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ScheduleList;
