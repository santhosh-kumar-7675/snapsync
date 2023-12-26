import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function ImageDisplay({ images }) {
  return (
    <Container className='mt-4'>
      <Row id='button-border' className='mb-4'>
        <h2 className="my-4">Posts</h2>
        <div>
          <Row>
            {images &&
              images.map((item, index) => (
                <Col lg={4} md={6} sm={12} key={index} className="mb-4">
                  {/* <p>{item.approved ? 'Approved' : 'Not Approved'}</p> */}
                  {item.approved && (
                    <>
                      {item.filename.endsWith('.mp4') ? (
                        <video width="100%" height="100%" controls>
                          <source src={`http://localhost:4500/${item.path}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={`http://localhost:4500/${item.path}`}
                          alt={item.filename}
                          style={{ width: '100%' }}
                        />
                      )}
                    </>
                  )}
                </Col>
              ))}
          </Row>
        </div>
      </Row>
    </Container>
  );
}
