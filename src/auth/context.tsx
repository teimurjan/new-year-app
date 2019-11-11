import React, { useEffect, useContext, useState } from "react";
import { useFirebase } from "../firebase/context";
import { User } from "firebase";

const AuthContext = React.createContext<{
  user: User | null;
  isInitiallyFetched: boolean;
} | null>(null);

export const UserProvider: React.FC = ({ children }) => {
  const firebase = useFirebase()!;
  const [user, setUser] = useState();
  const [isInitiallyFetched, setInitiallyFetched] = useState(false);

  useEffect(() => {
    return firebase.listenAuthChanges(user => {
      setUser(user);
      setInitiallyFetched(true);
    });
  }, [firebase]);

  return (
    <AuthContext.Provider value={{ user, isInitiallyFetched }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;
export const useAuth = () => useContext(AuthContext);
