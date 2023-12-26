import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import LoginForm from '../Login';

export default function AdminHome() {
  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row>
        <Col style={{width:"400px"}} className="LoginContainer p-4">
          <div>
            <Row className="justify-content-center">
              <LoginForm />
            </Row>
            {/* <hr className="my-2 bg-secondary" /> */}
            {/* <Row className="d-flex justify-content-center">
              <Button style={{ width: '95%' }} variant="success" className="mt-2">
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/admin/signup">
                  SignUp
                </Link>
              </Button>
            </Row> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
