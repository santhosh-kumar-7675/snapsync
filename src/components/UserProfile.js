import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import UserUploads from '../components/UserUploads';
import CustomNavbar from './CustomNavbar';

function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4500/users/${username}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        setError('User not found or internal server error');
      }
    };

    fetchUser();
  }, [username]);

  const isAuthenticated = localStorage.getItem('token') !== null;
  const tokenUsername = localStorage.getItem('username');
  // console.log(tokenUsername)
  return (
    <div>
      {/* <div style={{ maxWidth: '100%' }}>
        <CustomNavbar />
      </div> */}

      {error && <p className="text-danger">{error}</p>}
      {user && (
        <div className='container'>
          <Card className='mt-4'>
            <Card.Body>
              <Row>
                <Col xs={12} md={7}>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Text style={{ marginBottom: '4px' }}>
                    <strong>Email:</strong> {user.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Phone:</strong> {user.phone}
                  </Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <div className="mt-4">
            <Button variant="primary" className='mx-1' id='button-border'>
              <Link to={`/users/${username}/uploads`} className="text-white text-decoration-none">
                Posts
              </Link>
            </Button>
            {isAuthenticated && user && user.username === tokenUsername && (
              <Button variant="success" id='button-border'>
                <Link to={`/users/${username}/upload-files`} className="text-white text-decoration-none">
                  Make a post
                </Link>
              </Button>
            )}

          </div>
          <UserUploads />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
