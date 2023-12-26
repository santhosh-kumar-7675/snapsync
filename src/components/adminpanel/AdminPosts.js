import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Col, Row, Button, Modal , Form} from 'react-bootstrap';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import ZoomedImage from './ZoomedImage ';
import { MdClear } from 'react-icons/md';

export default function AdminPosts() {
  const [users, setUsers] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageToShow, setImageToShow] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ username: '', imagePath: '' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleClear = async() =>{
    fetchPosts();  
    setSearchQuery('');
  }
  
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4500/posts');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleShowImageModal = (image) => {
    setImageToShow(image);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  const handleDeleteImage = (username, imagePath) => {
    setDeleteTarget({ username, imagePath });
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteImage = async () => {
    try {
      await axios.delete(
        `http://localhost:4500/users/${deleteTarget.username}/images/${encodeURIComponent(
          deleteTarget.imagePath
        )}`
      );
      setShowDeleteConfirmation(false);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const cancelDeleteImage = () => {
    setShowDeleteConfirmation(false);
    setDeleteTarget({ username: '', imagePath: '' });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(`http://localhost:4500/postsp/search/${searchQuery}`);
      // console.log(response.data)
      setUsers(response.data);
    } catch (error) {
      console.error('Error searching for users:', error);
    }
  };
  
  return (
    <Container>
    <div className='container-fluid'>
      <div className='my-2 approval-wrapper'>
        <Row className='align-items-center justify-content-between'>
          <Col xs={12} md={3} lg={4}>
            <h2>Posts</h2>
          </Col>
          <Col xs={12} md={9} lg={8} className='d-flex flex-column flex-md-row align-items-md-center'>
            <Form.Group controlId="searchForm" className='mb-2 mb-md-0 mr-md-2'>
              <Form.Control
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
            <div >
              <Button variant="primary" onClick={handleSearch} className='m-1'>
                Search
              </Button>
              <Button onClick={handleClear} className='m-1'><MdClear /></Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>


      {users.map((user, rowIndex) => (
        <Row key={rowIndex} style={{ marginBottom: '20px', marginLeft: '-20px', marginRight: '-20px' }}>
          <Col >
            <Card>
              <Card.Header>{user.username}</Card.Header>
              <Card.Body>
                {user.images.length === 0 ? (
                  <p>No posts available for this user.</p>
                ) : (
                  <Row className='posts-wrapper'>
                    
                    {user.images.map((image, colIndex) => (
                        <Col key={colIndex}
                        //  xs={12} sm={12} md={3} lg={3} 
                         className='image-col'>
                          <div>
                            <img
                              src={`http://localhost:4500/${image.path}`}
                              alt={`Image ${colIndex}`}
                              style={{ maxWidth: '100%', height: '200px' }}
                            />
                            <p>Filename: {image.filename}</p>
                            <p>Originalname: {image.originalname}</p>
                            <p>Path: {image.path}</p>
                            <p>Approved: {image.approved ? 'Yes' : 'No'}</p>
                          </div>
                          <div className='button-wrapper'>
                            <Button
                              className='mb-1'
                              variant='danger'
                              onClick={() => handleDeleteImage(user.username, image.path)}
                            >
                              <MdDelete />
                            </Button>
                            <Button
                              variant='primary'
                              onClick={() => handleShowImageModal(image)}
                            >
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

      <Modal show={showImageModal} onHide={handleCloseImageModal} size="lg">
        <Modal.Header closeButton>
          <Button
            className='mb-1 mx-2'
            variant='danger'
            id='button-border'
            onClick={() => {
              handleDeleteImage(imageToShow.username, imageToShow.path);
              handleCloseImageModal();
            }}
          >
            <MdDelete />
          </Button>
          <Button id='button-border' variant="info" onClick={() => window.open(`http://localhost:4500/${imageToShow.path}`, '_blank')}>
            Open in New Tab
          </Button>
        </Modal.Header>
        <Modal.Body>
          {imageToShow && (
            <ZoomedImage imageUrl={`http://localhost:4500/${imageToShow.path}`} onClose={handleCloseImageModal} />
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showDeleteConfirmation} onHide={cancelDeleteImage}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this image?
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary'  id='button-border' onClick={cancelDeleteImage}>
            Cancel
          </Button>
          <Button variant='danger'  id='button-border' onClick={confirmDeleteImage}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
