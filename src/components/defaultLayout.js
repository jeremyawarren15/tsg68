import React from "react";
import DefaultNavbar from "./defaultNavbar";
import BaseLayout from "./baseLayout";
import Footer from "./footer";

export default function DefaultLayout({ children }) {
  return (
    <BaseLayout>
      <DefaultNavbar />
      { children }
      <Footer />
    </BaseLayout>
  );
};
