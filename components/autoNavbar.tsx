import { FunctionComponent } from 'react';
import AuthDataType from '../types/AuthDataType';
import AuthedNavbar from './authedNavbar';
import DefaultNavbar from './defaultNavbar';

type Props = {
  authData: AuthDataType
}

const AutoNavbar: FunctionComponent<Props> = ({authData}) => {
  const renderNav = () => {
    if (authData.isLoggedIn) return <AuthedNavbar authData={authData} />;
    return <DefaultNavbar />;
  }

  return (
    <>
      {renderNav()}
    </>
  )
}

export default AutoNavbar