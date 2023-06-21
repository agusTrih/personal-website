import LayoutApp from '@/layouts/LayoutApp';
import '/styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutApp>
      <Component {...pageProps} />
    </LayoutApp>
  );
}

export default MyApp;
