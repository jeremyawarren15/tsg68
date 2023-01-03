import { ReactNode } from 'react'
import React, { FunctionComponent } from "react";
import DefaultNavbar from "./defaultNavbar";
import Footer from "./footer";
import Head from 'next/head'
import AutoNavbar from './autoNavbar';

type Props = {
  children?: ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>TSG - Troop 68</title>
      </Head>
      <AutoNavbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
