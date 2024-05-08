import { createContext, useContext, useState, ReactNode } from "react";

interface AuthUser {
  // Define your AuthUser interface here based on the data structure
  // of your user object stored in localStorage
  id: string;
  userName: string | null;
  // Add other properties as needed
}

interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: (user: AuthUser | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    const storedUser = localStorage.getItem("chat-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const value = { authUser, setAuthUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
