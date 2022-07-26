import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function DefaultNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor: "#d10a1b"}}>
      <Container>
        <Navbar.Brand href="/">Troop 68</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/more">Learn More</Nav.Link>
            <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLScvqY4kwtT_bvMHGplOFZ7YYS8KayHzdocagW_HN0TrpraruQ/viewform?usp=sf_link">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
