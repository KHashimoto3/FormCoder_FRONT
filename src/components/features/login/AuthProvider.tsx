import { useState } from "react";
import { createContext } from "react";
import { User } from "../../types/user";

export const AuthContext = createContext(
  {} as {
    loginUser: User | null;
    setLoginUser: (user: User | null) => void;
  }
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  //eslint-disable-next-line
  children,
}) => {
  const [loginUser, setLoginUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
