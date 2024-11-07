// contexts/AuthContext.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';

interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  role?: string;
  joinedDate?: string;
  lastActive?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = cookie.get('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      axios
        .get(`http://localhost:5000/users/${storedUserId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => setUser(response.data))
        .catch(() => {
          cookie.remove('token');
          localStorage.removeItem('userId');
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', { email, password });
      const { token, user } = response.data;
      
      cookie.set('token', token, { expires: 1 });
      localStorage.setItem('userId', user._id);
      setToken(token);
      setUser(user);
      
      router.push('/profile');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    cookie.remove('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};
