import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import { MdClear } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import ZoomedImage from './ZoomedImage ';

export default function AdminApproval() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);
  const [showNonApproved, setShowNonApproved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [showNonApproved]);

  useEffect(() => {
    filterUsers();
  }, [users, showNonApproved, searchQuery]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4500/posts');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const filterUsers = () => {
    const filtered = users.filter(user => (
      (showNonApproved ? (user.images || user.posts).some(post => !post.approved) : true) &&
      (user.username.toLowerCase().includes(searchQuery.toLowerCase()))
    ));
    setFilteredUsers(filtered);
  };

  const handleShowImageModal = (image) => {
    setImageToShow(image);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  const toggleApproval = async (username, filename, currentApprovalStatus) => {
    try {
      await axios.post(
        `http://localhost:4500/users/${username}/images/approve`,
        { filename, approved: !currentApprovalStatus }
      );
      fetchPosts();
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:4500/posts/search/${searchQuery}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };

  const handleClear = async () => {
    fetchPosts();
    setSearchQuery('');
  };

  return (
    <Container>
    <div className='container-fluid'>
      <div className='approval-wrapper my-2'>
        <Row className='align-items-center justify-content-between'>
          <Col xs={12} md={12} lg={4}>
            <h2>Approval</h2>
          </Col>
          <Col xs={12} md={12} lg={8} className='d-flex flex-column flex-md-row align-items-md-center'>
            <Form.Group controlId="searchForm" className='mb-2 mb-md-0 mr-md-2'>
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
            <div>
              <Button variant="primary" onClick={handleSearch} className='m-1'>
                Search
              </Button>
              <Button onClick={handleClear} className='m-1'><MdClear /></Button>
            </div>
            <Form.Check
              type="switch"
              id="approvalToggle"
              label="Show Non-Approved"
              className='m-1'
              onChange={() => setShowNonApproved(!showNonApproved)}
            />
          </Col>
        </Row>
      </div>
    </div>

      {filteredUsers.map((user, rowIndex) => (
        <Row key={rowIndex} style={{ marginBottom: '20px', marginLeft: '-20px', marginRight: '-20px' }}>
          <Col md={12}>
            <Card>
              <Card.Header>{user.username}</Card.Header>
              <Card.Body>
                {(user.images || user.posts).length === 0 ? (
                  <p>No posts available for this user.</p>
                ) : (
                  <Row className='posts-wrapper'>
                    {(user.images || user.posts)
                      .filter((post) => (showNonApproved ? !post.approved : true))
                      .map((post, colIndex) => (
                        <Col
                          key={colIndex}
                          xs={12}
                          sm={12}
                          md={6}
                          lg={3}
                          className={`image-col ${!post.approved ? 'not-approved' : ''}`}
                        >
                          <div>
                            <img
                              src={`http://localhost:4500/${post.path}`}
                              alt={`Image ${colIndex}`}
                              style={{ maxWidth: '100%', height: '200px' }}
                            />
                            <Row id='approval-btn'>
                              <Button
                                style={{ width: '50%' }}
                                className='mb-4'
                                id='button-border'
                                variant={post.approved ? 'success' : 'secondary'}
                                onClick={() => toggleApproval(user.username, post.filename, post.approved)}
                              >
                                {post.approved ? 'Approved' : 'Approve'}
                              </Button>
                            </Row>
                          </div>
                          <div className='button-wrapper'>
                            <Button variant='primary' onClick={() => handleShowImageModal(post)}>
                              <FaEye />
                            </Button>
                          </div>
                        </Col>
                      ))}
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}

      <Modal show={showImageModal} onHide={handleCloseImageModal} size='lg'>
        <Modal.Header closeButton>
          <Button variant="info" id='button-border' onClick={() => window.open(`http://localhost:4500/${imageToShow.path}`, '_blank')}>
            Open in New Tab
          </Button>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '80vh', overflowY: 'auto' }} scrollable>
          {imageToShow && (
            <ZoomedImage
              imageUrl={`http://localhost:4500/${imageToShow.path}`}
              onClose={handleCloseImageModal}
            />
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
