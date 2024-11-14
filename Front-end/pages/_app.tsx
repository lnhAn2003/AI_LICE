// pages/_app.tsx
import React from 'react';
import '../styles/globals.css'
import Header from '../src/components/index/header';
import Footer from '../src/components/index/footer';
import { AppProps } from 'next/app';
import { AuthProvider } from '../src/contexts/AuthContext';
import { SocketProvider } from '../src/contexts/SocketContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider> {/* Ensure this is the outermost provider */}
      <AuthProvider>
      <div className="main-content">
        <Header/>
        <Component {...pageProps} />
        <Footer/>
      </div>
      </AuthProvider>
    </SocketProvider>
  );
}

export default MyApp;
