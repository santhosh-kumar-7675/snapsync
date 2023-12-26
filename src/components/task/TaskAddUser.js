import { Container, Form, Button } from "react-bootstrap";
import React, { useState } from 'react';

export default function TaskAddUser() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

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
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');
        // Reset the form after successful registration
        setFormData({
          username: '',
          email: '',
        });
      } else {
        console.error('Error registering user');
        // Handle error cases
      }
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle network or other errors
    }
  };

  return (
    <Container>
      <div>
        <h2>User register</h2>
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

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </Container>
  );
}
