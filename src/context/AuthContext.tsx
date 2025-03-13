import React, { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextValue {
  user: object | null;
  token: string;
  handleLogin: (userData: object, token: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [token, setToken] = useState<string>("");

  const handleLogin = (userData: object, token: string) => {
    console.log("Logged in user:", userData);
    setUser(userData);
    setToken(token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
