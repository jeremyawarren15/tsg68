import { FunctionComponent, useEffect, useState } from 'react';
import AuthedNavbar from './authedNavbar';
import DefaultNavbar from './defaultNavbar';
import client from '../services/pocketbaseService';
import { useAuthContext } from '../context/authContext';

const AutoNavbar: FunctionComponent = () => {
  const {loggedIn} = useAuthContext();

  const renderNav = () => {
    if (loggedIn) return <AuthedNavbar />;
    return <DefaultNavbar />;
  }

  return (
    <>
      {renderNav()}
    </>
  )
}

export default AutoNavbar