import Head from 'next/head'
import { ReactNode } from 'react'
import React, { FunctionComponent } from "react";
import AuthedNavbar from './authedNavbar';
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap';
import NavLink from '../components/navLink';
import { Routes } from '../constants/routes';
import Footer from "./footer";
import styles from '../styles/Sidebar.module.css';

type Props = {
  children?: ReactNode
}

const SidebarLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>TSG - Troop 68</title>
      </Head>
      <AuthedNavbar />
      <Container>
        <Row>
          <Col lg={3} id="sidebar">
            <Nav>
              <NavLink href={Routes.Faq}>FAQs</NavLink>
            </Nav>
            <Nav>
              <NavLink href={Routes.About}>About</NavLink>
            </Nav>
          </Col>
          <Col lg={9}>
            {children}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default SidebarLayout;
