import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import { Routes } from '../constants/routes';
import style from "../styles/ProfileDropdown.module.scss";
import { FunctionComponent } from 'react';
import client from '../services/pocketbaseService';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/authContext';
import Link from 'next/link';

const ProfileDropdown:FunctionComponent = () => {
  const {name} = client.authStore.model;
  const {signOut, avatarUrl} = useAuthContext();

  return (
    <NavDropdown className={`${style.toggle}`} align="end" title={
      <Image
        src={avatarUrl}
        className="rounded border border-light"
        height={40}
        width={40}
        alt="Profile image"
      />
    }>
      <NavDropdown.Header>{name}</NavDropdown.Header>
      <NavDropdown.Divider />
      <Link href={Routes.Account} passHref>
        <NavDropdown.Item>Account</NavDropdown.Item>
      </Link>
      <NavDropdown.Item disabled>Settings</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => signOut()}>
        Sign Out
      </NavDropdown.Item>
    </NavDropdown>
  )
};

export default ProfileDropdown;