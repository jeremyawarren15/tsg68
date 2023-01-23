import Client from "pocketbase";
import AuthDataType from "../types/AuthDataType";

const authHelper = (pb: Client): AuthDataType => {
  const authData = JSON.parse(JSON.stringify(pb.authStore))
  const url = pb.authStore.isValid ? pb.getFileUrl(authData.baseModel, authData.baseModel?.avatar) : "";

  return {
    isLoggedIn: pb.authStore.isValid,
    userModel: authData.baseModel,
    avatarUrl: url,
  }
}

export default authHelper;