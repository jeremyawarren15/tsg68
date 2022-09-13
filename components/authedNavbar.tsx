import { FunctionComponent } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import NavLink from '../components/navLink'
import Image from 'next/image';
import Link from 'next/link'
import ProfileDropdown from './profileDropdown';
import style from "../styles/Navbar.module.css";
import { Routes } from "../constants/routes";
import { useSession } from "next-auth/react"

const AuthedNavbar: FunctionComponent = () => {
  const { data } = useSession();

  if (!data?.user) return null;

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ backgroundColor: "#d10a1b" }}>
      <Container>
        <Navbar.Toggle />
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
        <ProfileDropdown name={data.user.name as string} image={data.user.image as string} />
        <Navbar.Collapse id='topCollapse'>
          <Nav>
            <NavLink href={Routes.Faq}>FAQs</NavLink>
          </Nav>
          <Nav>
            <NavLink href={Routes.About}>About</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AuthedNavbar;