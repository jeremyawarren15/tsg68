import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import SSRProvider from 'react-bootstrap/SSRProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </ SSRProvider>
  );
}

export default MyApp
