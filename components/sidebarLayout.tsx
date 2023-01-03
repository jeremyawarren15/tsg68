import Head from 'next/head'
import { ReactNode } from 'react'
import React, { FunctionComponent } from "react";
import AutoNavbar from './autoNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from "./footer";
import Sidebar from "./sidebar";

type Props = {
  children?: ReactNode
}

const SidebarLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>TSG - Troop 68</title>
      </Head>
      <AutoNavbar />
      <Container>
        <Row>
          <Col lg={2} id="sidebar" className='mt-4'>
            <Sidebar />
          </Col>
          <Col lg={10}>
            {children}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SidebarLayout;
