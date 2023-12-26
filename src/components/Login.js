import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const LoginForm = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname.includes('/login');
  const isAdminLoginRoute = location.pathname.includes('/admin');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4500/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('username', formData.username); // Add username to localStorage

      const isAdmin = response.data.role === 'admin';
      if (isAdmin) {
        navigate('/admin/home');
      } else {
        navigate(`/users/${formData.username}`);
      }

      console.log('Login successful!', response.data);
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError(true);
    }
  };

  return (
    <Container className="mt-4 p-4">
      <h2>Login</h2>
      {loginError && (
        <Alert variant="danger" className="my-3">
          Incorrect username or password. Please try again.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mb-4"
          />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: '100%' }} id="button-border">
          Login
        </Button>

        {(!isLoginRoute && !isAdminLoginRoute) && (
          <Button style={{ width: '100%' }} className="mt-4" variant="success" id="button-border">
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/signup">
              SignUp
            </Link>
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default LoginForm;
