import LayoutApp from '@/layouts/LayoutApp';
import '/styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutApp>
        <Component {...pageProps} />
      </LayoutApp>
      <Toaster />
    </QueryClientProvider>
  );
}

export default MyApp;
