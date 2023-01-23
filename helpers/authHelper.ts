import Client from "pocketbase";
import AuthDataType from "../types/AuthDataType";
import profile from '../public/profile.jpg'
import { StaticImageData } from "next/image";

const authHelper = (pb: Client): AuthDataType => {
  const authData = JSON.parse(JSON.stringify(pb.authStore))

  return {
    isLoggedIn: pb.authStore.isValid,
    userModel: authData.baseModel,
    avatar: getCorrectAvatar(pb, authData)
  }
}

const getCorrectAvatar = (pb: Client, authData: any) => {
  if (pb.authStore.isValid) {
    if (authData.baseModel.avatar !== "") {
      return pb.getFileUrl(authData.baseModel, authData.baseModel.avatar)
    } else {
      return  profile
    }
  }

  // user who is not logged in should not have an avatar
  return ""
}

export default authHelper;