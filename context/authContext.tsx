import { createContext, useContext, useEffect, useState } from 'react';
import client from '../services/pocketbaseService';
import { useRouter } from 'next/router';
import { Routes } from '../constants/routes';
import profile from '../public/profile.jpg';
import { StaticImageData } from 'next/image';

const AppContext = createContext(null);

export function AuthProvider({children}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | StaticImageData>("/profile.jpg");
  const user = client.authStore.model;
  const router = useRouter();

  const getAvatarUrl = async () => {
    const user = await client.collection('users').getOne(client.authStore.model.id);
    if (user.avatar) {
      return client.getFileUrl(user, user.avatar)
    }
    return profile;
  }

  const signIn = async (email: string, password: string) => {
    await client.collection('users').authWithPassword(email, password);
    setLoggedIn(true);
    setAvatarUrl(await getAvatarUrl());
    router.push(Routes.Events);
  }

  const signOut = () => {
    client.authStore.clear();
    setLoggedIn(false);
    setAvatarUrl("")
    router.push("/");
  }

  useEffect(() => {
    const {model, isValid} = client.authStore;
    if (model !== null) {
      if (isValid) {
        setLoggedIn(true);
        getAvatarUrl().then((url) => {
          setAvatarUrl(url);
        })
      }
    }
  }, [])

  return (
    <AppContext.Provider value={{loggedIn, avatarUrl, signIn, signOut, user}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AppContext)
}