import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    role: '',
  });

  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [role, setRole] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    setUsernameExists(false);
    setEmailExists(false);
  }, [formData.username, formData.email]);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      role: role,
    }));
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (value.length !== 10) {
        setPhoneError('Phone number must be 10 digits long.');
      } else {
        setPhoneError('');
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'username') {
      setUsernameTouched(true);
    } else if (name === 'email') {
      setEmailTouched(true);
    }
  };

  const handleUsernameCheck = async () => {
    try {
      if (usernameTouched) {
        const response = await axios.get(`http://localhost:4500/users/${formData.username}`);
        if (response.data) {
          setUsernameExists(true);
        } else {
          setUsernameExists(false);
        }
      }
    } catch (error) {
      console.error('Error checking username:', error);
    }
  };

  const handleEmailCheck = async () => {
    try {
      if (emailTouched) {
        const response = await axios.get(`http://localhost:4500/users/email/${formData.email}`);
        if (response.data.length > 0) {
          setEmailExists(true);
        } else {
          setEmailExists(false);
        }
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleUsernameCheck();
      await handleEmailCheck();

      if (usernameExists || emailExists) {
        return;
      }

      const currentUrl = window.location.href;
      const role = currentUrl.indexOf('/admin/signup') !== -1 ? 'admin' : 'user';

      const response = await axios.post('http://localhost:4500/signup', {
        ...formData,
        role: role,
      });

      if (role === 'admin') {
        navigate('/admin/login');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <Container className="p-4" id='button-border'  style={{ maxWidth: '400px' ,margin:'5% auto' }}>
      <h1>Sign Up</h1>

      {usernameExists && (
        <Alert variant="danger" className="my-3">
          This username is already taken. Please choose another username.
        </Alert>
      )}

      {emailExists && (
        <Alert variant="danger" className="my-3">
          This email address is already associated with an account. Please use another email address.
        </Alert>
      )}

      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleUsernameCheck}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleEmailCheck}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            isInvalid={phoneError !== ''}
          />
          <Form.Control.Feedback type="invalid">
            {phoneError}
          </Form.Control.Feedback>
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
            className='mb-3'

          />
        </Form.Group>

        <Button variant="primary" style={{ width: '100%' }} id='button-border'
           type="submit" disabled={usernameExists || emailExists}>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default SignUpForm;
