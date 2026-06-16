"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { storage } from "../services/storage";
export interface User {
  full_name: string;
  email: string;
  role: string;
}
interface ChildProps {
  children: ReactNode;
}
export interface AuthData {
  user: User | null;
  setUser:Dispatch<SetStateAction<User|null>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthData | null>(null);

export const AuthProvider = ({ children }: ChildProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // initialize auth state from persisted storage
    const token = storage.getAccessToken();
    const userData = localStorage.getItem("user");

    // Restore `user` from storage so UI can show profile fields on refresh
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }

    // isAuthenticated depends on presence of token
    setIsAuthenticated(Boolean(token));

    // mark loading finished regardless
    setIsLoading(false);
  }, []);

  // persist user whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    storage.clearTokens();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        setUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
