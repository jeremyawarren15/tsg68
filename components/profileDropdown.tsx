import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import { Routes } from '../constants/routes';
import style from "../styles/ProfileDropdown.module.css";
import { FunctionComponent } from 'react';
import { signOut } from 'next-auth/react';

type Props = {
  name: string,
  image: string
}

const ProfileDropdown:FunctionComponent<Props> = ({name, image}) => {
  return (
    <NavDropdown className={`${style.toggle}`} align="end" title={
      <Image
        src={image}
        className="rounded"
        height={40}
        width={40}
        alt="Black and White Portrait of a Man"
      />
    }>
      <NavDropdown.Header>{name}</NavDropdown.Header>
      <NavDropdown.Divider />
      <NavDropdown.Item disabled>Account</NavDropdown.Item>
      <NavDropdown.Item disabled>Settings</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => signOut({
        callbackUrl: Routes.Home
      })}>
        Sign Out
      </NavDropdown.Item>
    </NavDropdown>
  )
};

export default ProfileDropdown;