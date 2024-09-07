// components/Tutor/TutorRegister.js
import React, { useState } from "react";
import axios from "axios";

function TutorRegister() {
  const [subject, setSubject] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
     await axios.post(
        "http://localhost:3000/api/tutors/create",
        { subject, hourlyRate, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("튜터 프로필이 생성되었습니다.");
    } catch (error) {
      setMessage("프로필 생성 실패. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        required
      />
      <input
        type="number"
        value={hourlyRate}
        onChange={(e) => setHourlyRate(e.target.value)}
        placeholder="Hourly Rate"
        required
      />
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Bio"
        required
      />
      <button type="submit">Register as Tutor</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default TutorRegister;
