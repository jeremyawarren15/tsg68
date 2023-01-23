type UserType = {
  id: string;
  username: string;
  name: string | null;
  avatar: string | null;
  avatarUrl: string | null;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string | null;
  emailVisibility: boolean;
  firstName: string | null;
  lastName: string | null;
  updated: string;
  verified: boolean;
}

export default UserType;