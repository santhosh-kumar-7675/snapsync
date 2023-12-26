import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

function AllUsersDetail() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4500/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div>
      <Row></Row>
      <Col></Col>
      <h1>All users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Username: {user.username}, Email: {user.email}, Phone: {user.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}


export default AllUsersDetail;
