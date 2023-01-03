import { createContext, useContext, useState } from 'react';
import client from '../services/pocketbaseService';

const AppContext = createContext(null);

export function AuthProvider({children}) {
  const [loggedIn, setLoggedIn] = useState(client.authStore.model !== null);

  return (
    <AppContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AppContext)
}