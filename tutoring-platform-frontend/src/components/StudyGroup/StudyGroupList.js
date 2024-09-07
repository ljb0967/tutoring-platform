// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './StudyGroup.css';  // 스타일 추가

// function StudyGroupList() {
//     const [studyGroups, setStudyGroups] = useState([]);

//     useEffect(() => {
//         const fetchStudyGroups = async () => {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:3000/api/study-groups/my-groups', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setStudyGroups(response.data);
//         };

//         fetchStudyGroups();
//     }, []);

//     return (
//         <div>
//             <h2>Your Study Groups</h2>
//             <ul>
//                 {studyGroups.map(group => (
//                     <li key={group._id}>{group.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default StudyGroupList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './StudyGroup.css';  // 스타일 추가

// function StudyGroupList() {
//     const [studyGroups, setStudyGroups] = useState([]);

//     useEffect(() => {
//         const fetchStudyGroups = async () => {
//             const token = localStorage.getItem('token');
//             const response = await axios.get('http://localhost:3000/api/study-groups/my-groups', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setStudyGroups(response.data);
//         };

//         fetchStudyGroups();
//     }, []);

//     return (
//         <div className="study-group-container">  {/* 클래스명 추가 */}
//             <h2>Your Study Groups</h2>
//             <ul>
//                 {studyGroups.map(group => (
//                     <li key={group._id}>{group.name}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default StudyGroupList;


// components/StudyGroup/StudyGroupList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudyGroupList() {
  const [studyGroups, setStudyGroups] = useState([]);

  useEffect(() => {
    const fetchStudyGroups = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/study-groups/my-groups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudyGroups(response.data);
    };
    fetchStudyGroups();
  }, []);

  return (
    <div>
      <h2>Your Study Groups</h2>
      <ul>
        {studyGroups.map(group => (
          <li key={group._id}>{group.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default StudyGroupList;

