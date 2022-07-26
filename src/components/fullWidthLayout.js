import React from "react";
import DefaultNavbar from "./defaultNavbar";
import BaseLayout from "./baseLayout";
import Container from 'react-bootstrap/Container';

export default function FullWidthLayout({ children }) {
  return (
    <BaseLayout>
      <DefaultNavbar />
      <Container className="pt-3">
        { children }
      </Container>
    </BaseLayout>
  )
};
