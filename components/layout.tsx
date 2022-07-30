import { ReactNode } from 'react'
import React, { FunctionComponent } from "react";
import DefaultNavbar from "./defaultNavbar";
import Footer from "./footer";
import Head from 'next/head'
import styles from '../styles/Layout.module.css';

type Props = {
  children?: ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>TSG - Troop 68</title>
      </Head>
      <DefaultNavbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
