import { NavDropdown } from 'react-bootstrap';
import Image from 'next/image';
import { Routes } from '../constants/routes';
import style from "../styles/ProfileDropdown.module.scss";
import { FunctionComponent } from 'react';
import Link from 'next/link';
import AuthDataType from '../types/AuthDataType';
import { useRouter } from 'next/router';

type Props = {
  authData: AuthDataType
}

const ProfileDropdown:FunctionComponent<Props> = ({authData}) => {
  const router = useRouter();
  const signOut = async () => {
    await fetch('/api/signout', { method: 'POST'})
    router.push(Routes.Home)
  }

  return (
    <NavDropdown className={`${style.toggle}`} align="end" title={
      <Image
        src={authData.avatar}
        className="rounded border border-light"
        height={40}
        width={40}
        alt="Profile image"
      />
    }>
      <NavDropdown.Header>{authData.userModel.name}</NavDropdown.Header>
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