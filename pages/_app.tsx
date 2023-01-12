import { ReactNode, ReactElement } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import SSRProvider from 'react-bootstrap/SSRProvider'
import { NextPage } from "next";
import { AuthProvider } from "../context/authContext";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps: { ...pageProps } }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <SSRProvider>
      <AuthProvider>
        { getLayout(<Component {...pageProps} />) }
      </AuthProvider>
    </ SSRProvider>
  )
}

export default App
