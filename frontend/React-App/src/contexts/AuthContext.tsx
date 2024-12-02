import { User, onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, useEffect, useMemo, useState } from "react";

import { auth } from "../firebase";

type ProviderProps = {
  children: ReactNode;
};

type contextType = {
  currentUser: User | undefined | null;
  signedIn: boolean;
};

export const AuthContext = React.createContext<contextType>({
  currentUser: null,
  signedIn: false,
});

// Gets auth info, such as if the user is signed in and the basic user information
export function AuthProvider({ children }: ProviderProps) {
  const [currentUser, setUser] = useState<User | null | undefined>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | undefined | null) => {
      if (user) {
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ currentUser, signedIn: !!currentUser }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
