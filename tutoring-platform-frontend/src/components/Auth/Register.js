// import React, { useState } from 'react';
// import axios from 'axios';

// function Register() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [name, setName] = useState('');
//     const [university, setUniversity] = useState('');
//     const [major, setMajor] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:3000/api/users/register', {
//                 email, password, name, university, major
//             });
//             console.log(response.data.message);
//         } catch (error) {
//             console.error(error.response.data.error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
//             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
//             <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="University" />
//             <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="Major" />
//             <button type="submit">Register</button>
//         </form>
//     );
// }

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';  // 스타일 추가

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [university, setUniversity] = useState('');
    const [major, setMajor] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/users/register', { email, password, name, university, major });
            setMessage('회원가입에 성공했습니다. 이메일 인증을 완료해주세요.');
            navigate('/login');  // 회원가입 성공 후 로그인 페이지로 이동
        } catch (error) {
            setMessage('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="text" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="University" required />
                <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} placeholder="Major" required />
                <button type="submit">Register</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default Register;

