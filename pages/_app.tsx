import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import SSRProvider from 'react-bootstrap/SSRProvider'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SSRProvider>
        <Component {...pageProps} />
      </ SSRProvider>
    </SessionProvider>
  );
}

export default MyApp
