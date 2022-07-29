import { ReactNode } from 'react'
import React, { FunctionComponent } from "react";
import DefaultNavbar from "./defaultNavbar";
import Footer from "./footer";

type Props = {
  children?: ReactNode
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <DefaultNavbar />
      { children }
      <Footer />
    </>
  );
};

export default Layout;
