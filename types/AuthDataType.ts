import { StaticImageData } from 'next/image';
import UserType from './UserType';

type AuthDataType = {
  isLoggedIn: boolean,
  avatar: string | StaticImageData,
  userModel: UserType,
}

export default AuthDataType;