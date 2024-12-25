// src/contexts/AuthContext.tsx

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import axiosInstance from '../utils/axiosInstance';
import Cookies from 'js-cookie';
import { useSocketContext } from './SocketContext';

interface User {
  profile: any;
  _id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  roleId?: { _id: string; name: string };  
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
          const fetchedUser = response.data;
          fetchedUser.role = fetchedUser.roleId?.name === 'Admin' ? 'Admin' : 'User';

          setUser(fetchedUser);
          socket?.emit('user-logged-in', fetchedUser);
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
      const { token, user: fetchedUser } = response.data;

      fetchedUser.role = fetchedUser.roleId?.name === 'Admin' ? 'Admin' : 'User';

      Cookies.set('token', token, { expires: 1 });
      setToken(token);
      setUser(fetchedUser);

      socket?.emit('user-logged-in', fetchedUser);

      // If user is Admin, redirect to /admin, else redirect to /auth/profile
      if (fetchedUser.role === 'Admin') {
        router.push('/admin');
      } else {
        router.push('/auth/profile');
      }
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
