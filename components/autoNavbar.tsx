import { FunctionComponent } from 'react';
import AuthedNavbar from './authedNavbar';
import DefaultNavbar from './defaultNavbar';
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