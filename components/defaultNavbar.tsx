import { FunctionComponent } from 'react';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import style from  "../styles/DefaultNavbar.module.css";

const DefaultNavbar: FunctionComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{backgroundColor: "#d10a1b"}}>
      <Container>
        <Navbar.Brand href="/" className={style.brand}>
          <Image
            alt="TSG Shield Logo"
            src="/TSG_shield.png"
            width={40}
            height={40}
          />
          <span className='ms-2'>Troop 68</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="https://troopsofsaintgeorge.org/wp-content/uploads/2020/09/2020-09-28-TSG-Officers-Manual-2020-Ed.pdf">Officer's Manual</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLScvqY4kwtT_bvMHGplOFZ7YYS8KayHzdocagW_HN0TrpraruQ/viewform?usp=sf_link">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DefaultNavbar;