import '@styles/globals.css';
import Navbar from '@components/Navbar';
import { UserContext } from '@lib/context';
import { useUserData } from '@lib/hooks';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@components/ErrorBoundary';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <ErrorBoundary>
      <Head>
        {/* Preload critical fonts to avoid render blocking */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          as="style"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Preload background image */}
        <link rel="preload" href="/Sun-Tornado.svg" as="image" type="image/svg+xml" />
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
      </Head>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster/>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
