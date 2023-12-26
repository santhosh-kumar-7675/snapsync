import { Container, Form, Button, Alert } from "react-bootstrap";
import React, { useState } from 'react';
import image1 from '../images/profile/pexels-behrouz-sasani-9995045.jpg';
export default function Task() {
  const [formData, setFormData] = useState({
    name: '',
    images: [],
  });
  const [error, setError] = useState(null);
  
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: [...e.target.files], 
    });
  };
  

  const handleNameChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
  
    for (let i = 0; i < formData.images.length; i++) {
      formDataToSubmit.append("files", formData.images[i]);
    }
  
    fetch(`http://localhost:5000/userpost`, {
      method: 'POST',
      body: formDataToSubmit,
    })
      .then((res) => {
        if (res.ok) {
          console.log("Files uploaded successfully");
          setFormData({
            name: '',
            images: [],
          });
        }
         else {
          return res.json().then((data) => {
            console.log("Error response data:", data);
            if (data && data.message) {
              setError(data.message);
            } else {
              setError("Unknown error occurred");
            }
          });
        }
      })
      .catch((err) => {
        console.error("Error occurred", err);
        setError("Internal Server Error");
      });
  };
  
  return (
    <Container>
      <h2>Post something:</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}  encType="multipart/form-data"> 
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="files"
          value={formData.name}
          onChange={handleNameChange}
          required
        />
        <img src={image1}/>
        <Form.Label>Select files to be uploaded</Form.Label>
        <Form.Control
          type="file"
          id="files"
          multiple
          onChange={handleFileChange}
          required
        />

        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
    </Container>
  );
}
