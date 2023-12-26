import React from 'react';
import { Navbar, Container, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logout from "./Logout";

function CustomNavbar() {
  return (
    <div>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to='/' style={{ font: 'inherit', textDecoration: 'inherit' }}>SnapSync</Link>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* <Navbar.Collapse id="basic-navbar-nav">
            <form className="d-flex align-items-center">
              <FormControl
                type="search"
                placeholder="Search..."
                className="mr-2"
                aria-label="Search"
                style={{ height: '40px', fontSize: '16px', lineHeight: '20px' }} // Adjust the values as needed
              />
              <Button variant="outline-success" style={{ height: '40px', fontSize: '16px', lineHeight: '20px' }}>Search</Button>
            </form>
          </Navbar.Collapse> */}
          <Logout />
        </Container>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;
