import React from "react";
import { Helmet } from 'react-helmet';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.css";

export default function BaseLayout({ children }) {
  return (
    <>
      <Helmet>
        <title>TSG - Troop 68</title>
      </Helmet>
      { children }
    </>
  );
};
