import { ReactNode } from 'react'
import React, { FunctionComponent } from "react";
import Footer from "./footer";
import Head from 'next/head'
import AutoNavbar from './autoNavbar';
import AuthDataType from '../types/AuthDataType';

type Props = {
  children?: ReactNode,
  authData: AuthDataType
}

const Layout: FunctionComponent<Props> = ({ authData, children }) => {
  return (
    <>
      <Head>
        <title>TSG - Troop 68</title>
      </Head>
      <AutoNavbar authData={authData} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
