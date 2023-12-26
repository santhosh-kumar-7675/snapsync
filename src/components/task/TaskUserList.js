import React, { useState, useEffect } from 'react';

const TaskUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users when the component mounts
    fetch('http://localhost:5000/users')
      .then(response => response.json())
      .then(data => {
        console.log('Data received from server:', data);
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            <strong>Username:</strong> {user.username}, <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskUserList;
