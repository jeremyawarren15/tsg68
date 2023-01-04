import { createContext, useContext, useEffect, useState } from 'react';
import client from '../services/pocketbaseService';
import { useRouter } from 'next/router';
import { Routes } from '../constants/routes';

const AppContext = createContext(null);

export function AuthProvider({children}) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("/profile.jpg");
  const router = useRouter();

  const getAvatarUrl = async () => {
    const user = await client.collection('users').getOne(client.authStore.model.id);
    const url = client.getFileUrl(user, user.avatar)
    return url;
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
    setLoggedIn(client.authStore.model !== null);
    if (client.authStore.model !== null) {
      getAvatarUrl().then((url) => {
        setAvatarUrl(url);
      })
    }
  }, [])

  return (
    <AppContext.Provider value={{loggedIn, avatarUrl, signIn, signOut}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AppContext)
}