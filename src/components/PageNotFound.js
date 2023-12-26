import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import notFoundImage from '../images/icons/404.jpg';

export default function PageNotFound() {
  return (
    <Container className="text-center my-5">
      <Row className="justify-content-center align-items-center vh-10">
        {/* Use vh-100 to make the row take the full height of the viewport */}
        <Col>
          <Image src={notFoundImage} style={{height:'25%', width:'25%'}} alt="Page Not Found" fluid />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <h2 className="mt-4">Error 404</h2>
          <p className="lead">Page Not Found</p>
          <p className="text-muted">Oops! It seems like the page you are looking for does not exist.</p>
        </Col>
      </Row>
    </Container>
  );
}
