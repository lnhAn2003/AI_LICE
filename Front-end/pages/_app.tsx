import React from 'react';
import '../styles/globals.css';
import Header from '../src/components/index/header';
import Footer from '../src/components/index/footer';
import { AppProps } from 'next/app';
import { AuthProvider } from '../src/contexts/AuthContext';
import { SocketProvider } from '../src/contexts/SocketContext';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <SocketProvider>
        <AuthProvider>
          <div className="main-content">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </AuthProvider>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default MyApp;
