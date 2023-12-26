import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function AdminPanelHome() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4500/users');

      const sortedUsers = response.data
        .map((user) => ({
          username: user.username,
          approvedImages: user.images.filter((image) => image.approved).length,
          unapprovedImages: user.images.filter((image) => !image.approved).length,
        }))
        .sort((a, b) => b.approvedImages - a.approvedImages);

      const topUsers = sortedUsers.slice(0, 5);
      setUsers(topUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const barChartData = users.map((user) => ({
    username: user.username,
    approved: user.approvedImages,
    unapproved: user.unapprovedImages,
  }));

  return (
    <Container>
      <h2>Admin Panel !!</h2>

      {/* Top 5 Users (Table) */}
      <Row>
        <Col xs={12} md={6}>
          <h3>Top 5 Users</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Username</th>
                <th>Number of Approved Posts</th>
                <th>Number of Unapproved Posts</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.username}>
                  <td>{user.username}</td>
                  <td>{user.approvedImages}</td>
                  <td>{user.unapprovedImages}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Top 5 Users (Bar Chart) */}
      <Row>
        <Col xs={12} md={12}>
          <h3>Top 5 Users (Approved vs Unapproved posts)</h3>
          <div style={{ height: '300px', overflow: 'auto', marginLeft: '0' }}>
            <BarChart width={400} height={300} data={barChartData}>
              <XAxis dataKey="username" />
              <YAxis ticks={[0, 2, 4, 6, 8, 10, 12]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="approved" name="Approved Posts" fill="#0d6efd" stackId="a" />
              <Bar dataKey="unapproved" name="Unapproved Posts" fill="#dc3545" stackId="a" />
            </BarChart>
          </div>
        </Col>
      </Row>

      {/* Second Bar Chart */}
      <Row>
        <Col xs={12} md={12}>
          <h3>Top 5 Users (Approved posts)</h3>
          <div style={{ height: '300px', overflow: 'auto', marginLeft: '0' }}>
            <BarChart width={400} height={300} data={barChartData}>
              <XAxis dataKey="username" />
              <YAxis ticks={[0, 2, 4, 6, 8, 10, 12]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="approved" name="Approved Posts" fill="#0d6efd" />
            </BarChart>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
