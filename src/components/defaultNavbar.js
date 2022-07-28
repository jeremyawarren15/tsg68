import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function DefaultNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor: "#d10a1b"}}>
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="TSG Shield Logo"
            src="TSG_shield.png"
            width="40px"
            style={{marginRight: "10px"}}
          />
          Troop 68
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/tsg">About TSG</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://troopsofsaintgeorge.org/wp-content/uploads/2020/09/2020-09-28-TSG-Officers-Manual-2020-Ed.pdf">Officer's Manual</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLScvqY4kwtT_bvMHGplOFZ7YYS8KayHzdocagW_HN0TrpraruQ/viewform?usp=sf_link">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
