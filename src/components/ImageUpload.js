import { Container, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ImageUpload() {
  const { username } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    files: [],
  });

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      files: e.target.files,
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
    formDataToSubmit.append('name', formData.name);

    for (let i = 0; i < formData.files.length; i++) {
      formDataToSubmit.append('files', formData.files[i]);
    }

    fetch(`http://localhost:4500/users/${username}/upload-files`, {
      method: 'POST',
      body: formDataToSubmit,
    })
      .then((res) => {
        if (res.ok) {
          console.log('Files uploaded successfully');
          // Redirect to the uploads page
          window.location.href = `/users/${username}/uploads`;
        } else {
          console.error('Error occurred', res);
        }
      })
      .catch((err) => console.error('Error occurred', err));

    setFormData({
      name: '',
      files: [],
    });
  };

  return (
    <Container className="mt-4 p-4" style={{maxWidth:'50%'}} id='button-border'>
      <Form onSubmit={handleSubmit}>
        {/* <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the name"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            required
          />
        </Form.Group> */}

        <Form.Group>
          <Form.Label>Select files to be uploaded</Form.Label>
          <Form.Control
            type="file"
            id="formFiles"  // Use id directly here
            multiple
            onChange={handleFileChange}
            required
          />
        </Form.Group>


        <Button variant="primary" type="submit">
          Upload
        </Button>
      </Form>
    </Container>
  );
}
