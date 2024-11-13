import React, { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { useSocketContext } from './SocketContext';

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
  const { socket } = useSocketContext();

  useEffect(() => {
    const storedToken = Cookies.get('token');

    if (storedToken) {
      setToken(storedToken);

      axios
        .get('http://localhost:5000/users/profile', {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((response) => {
          setUser(response.data);

          // Emit 'user-logged-in' event
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
      const response = await axios.post('http://localhost:5000/users/login', {
        email,
        password,
      });
      const { token, user } = response.data;

      Cookies.set('token', token, { expires: 1 });
      setToken(token);
      setUser(user);

      // Emit 'user-logged-in' event
      socket?.emit('user-logged-in', user);

      router.push('/profile');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setToken(null);
    setUser(null);

    // Emit 'user-logged-out' event
    socket?.emit('user-logged-out');

    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
