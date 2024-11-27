import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { User, getUser } from "../api/users";

import { AuthContext } from "./AuthContext";



type ProviderProps = {
  children: ReactNode;
};

type contextType = {
  currentUser: User | null;
  refetchData: () => void;
};

export const DataContext = React.createContext<contextType>({
  currentUser: null,
  refetchData: () => null,
});

// Current user in data context contains MongoDB entry of the logged in user
export function DataProvider({ children }: ProviderProps) {
  const [currentUser, setUser] = useState<User | null>(null);
  const auth = useContext(AuthContext);

  const fetchData = useCallback(async () => {
    if (auth.currentUser) {
        const response = await getUser(auth.currentUser.email ?? "");
        if (response.success) {
            const data = await response.data;
            setUser(data.user);
        }
    }
  }, [auth]);

  useEffect(() => {
    fetchData().catch(console.error);
  }, [auth]);

  const value = useMemo(
    () => ({
      currentUser,
      refetchData: fetchData,
    }),
    [currentUser],
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
