import UserType from './UserType';

type AuthDataType = {
  isLoggedIn: boolean,
  avatarUrl: string,
  userModel: UserType,
}

export default AuthDataType;