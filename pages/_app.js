import '@styles/globals.css';
import Navbar from '@components/Navbar';
import { UserContext } from '@lib/context';
import { useUserData } from '@lib/hooks';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '@components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <ErrorBoundary>
      <UserContext.Provider value={userData}>
        <Navbar />
        <Component {...pageProps} />
        <Toaster/>
      </UserContext.Provider>
    </ErrorBoundary>
  );
}

export default MyApp;
