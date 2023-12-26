import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, Form, Row, Col, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { MdModeEdit, MdDelete } from 'react-icons/md';
import { FaBan } from 'react-icons/fa';

function AdminUserList() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    newUsername: '',
    email: '',
    newPhone: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4500/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filterUsers = () => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleDelete = async () => {
    try {
      if (userToDelete) {
        await axios.delete(`http://localhost:4500/users/${userToDelete.email}`);
        fetchUsers();
      }
      handleCloseConfirmation();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleShowConfirmation = (user) => {
    setUserToDelete(user);
    setShowConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setUserToDelete(null);
  };

  const handleShowEditModal = (user) => {
    setUserToEdit(user);
    setEditedUserData({
      newUsername: user.username,
      email: user.email,
      newPhone: user.phone,
    });
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setUserToEdit(null);
    setEditedUserData({
      username: '',
      email: '',
      phone: '',
    });
    setFeedbackMessage('');
  };

  const handleEdit = async () => {
    try {
      if (userToEdit) {
        if (editedUserData.newPhone.length !== 10) {
          setFeedbackMessage('Phone number must be 10 digits long.');
          return;
        }

        await axios.patch(`http://localhost:4500/users/${userToEdit.email}`, editedUserData);
        fetchUsers();
        handleCloseEditModal();
      }
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
    setFeedbackMessage('');
  };

  return (
    <Container>
      <h2>Users</h2>
      <Form.Group controlId="searchForm">
        <Form.Control
          type="text"
          placeholder="Search by username, email, or phone"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>

      <Row>
        <Col xs={12}>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Number of Images</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.images.length}</td>
                  <td>
                    <Button id="button-border" onClick={() => handleShowEditModal(user)}>
                      <MdModeEdit />
                    </Button>
                  </td>
                  <td>
                    <Button id="button-border" onClick={() => handleShowConfirmation(user)} variant="danger">
                      <MdDelete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                name="newUsername"
                value={editedUserData.newUsername}
                onChange={handleEditInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={editedUserData.email || ''}
                onChange={handleEditInputChange}
                disabled
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                name="newPhone"
                value={editedUserData.newPhone}
                onChange={handleEditInputChange}
              />
            </Form.Group>
          </Form>
          {feedbackMessage && (
            <Alert variant="danger" className="my-3">
              {feedbackMessage}
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the user with email: {userToDelete && userToDelete.email}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminUserList;
