import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useSocketContext } from './SocketContext';

interface User {
  profile: any;
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
  const { socket } = useSocketContext();

  useEffect(() => {
    const storedToken = Cookies.get('token');

    if (storedToken) {
      setToken(storedToken);

      axiosInstance
        .get('/users/profile', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          socket?.emit('user-logged-in', response.data);
        })
        .catch(() => {
          Cookies.remove('token');
          setToken(null);
          setUser(null);
        });
    }
  }, [socket]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/users/login', {
        email,
        password,
      });
      const { token, user } = response.data;

      Cookies.set('token', token, { expires: 1 });
      setToken(token);
      setUser(user);

      socket?.emit('user-logged-in', user);

      router.push('/auth/profile');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUser(null);

    socket?.emit('user-logged-out');

    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
