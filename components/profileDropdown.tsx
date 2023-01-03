import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import { Routes } from '../constants/routes';
import style from "../styles/ProfileDropdown.module.scss";
import { FunctionComponent } from 'react';
import client from '../services/pocketbaseService';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/authContext';

const ProfileDropdown:FunctionComponent = () => {
  const {name} = client.authStore.model;
  const router = useRouter();
  const {setLoggedIn} = useAuthContext();

  const signOut = () => {
    client.authStore.clear();
    setLoggedIn(false);
    router.push("/");
  }

  return (
    <NavDropdown className={`${style.toggle}`} align="end" title={
      <Image
        src={""}
        className="rounded border border-light"
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
      <NavDropdown.Item onClick={() => signOut()}>
        Sign Out
      </NavDropdown.Item>
    </NavDropdown>
  )
};

export default ProfileDropdown;