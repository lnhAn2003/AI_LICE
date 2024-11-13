// pages/_app.tsx
import React from 'react';
import '../styles/globals.css'
import Header from '../components/index/header';
import { AppProps } from 'next/app';
import { AuthProvider } from '../contexts/AuthContext';
import { SocketProvider } from '../contexts/SocketContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider> {/* Ensure this is the outermost provider */}
      <AuthProvider>
        <Header/>
        <Component {...pageProps} />
      </AuthProvider>
    </SocketProvider>
  );
}

export default MyApp;
