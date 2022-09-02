import { FunctionComponent } from 'react';
import Image from 'next/image';
import { Nav, Navbar, Container } from 'react-bootstrap';
import NavLink from '../components/navLink'
import Link from 'next/link'
import style from "../styles/DefaultNavbar.module.css";
import { Routes } from "../constants/routes";

import { useSession, signIn, signOut } from "next-auth/react"

const DefaultNavbar: FunctionComponent = () => {
  const {data, status} = useSession();

  const renderLogin = () => {
    if (data?.user) {
      return (
        <Nav className='ms-auto'>
          <button className="btn btn-outline-light" onClick={() => signOut()}>Sign Out</button>
        </Nav>
      );
    }

    return (
      <Nav className='ms-auto'>
        <button className="btn btn-outline-light" onClick={() => signIn()}>Sign In</button>
      </Nav>
    )
  }

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ backgroundColor: "#d10a1b" }}>
      <Container>
        <Link href={Routes.Home} passHref>
          <Navbar.Brand className={style.brand}>
            <Image
              alt="TSG Shield Logo"
              src="/TSG_shield.png"
              width={40}
              height={40}
            />
            <span className='ms-2'>Troop 68</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {
            data &&
            <Nav>
              <NavLink href={Routes.Events}>Events</NavLink>
            </Nav>
          }
          <Nav>
            <NavLink href={Routes.Faq}>FAQs</NavLink>
          </Nav>
          <Nav>
            <NavLink href={Routes.About}>About</NavLink>
          </Nav>
          <Nav>
            <Nav.Link href="https://docs.google.com/forms/d/e/1FAIpQLScvqY4kwtT_bvMHGplOFZ7YYS8KayHzdocagW_HN0TrpraruQ/viewform?usp=sf_link">Register</Nav.Link>
          </Nav>
          {renderLogin()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DefaultNavbar;