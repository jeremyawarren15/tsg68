import { ReactNode, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/layout";
import { useAuthContext } from "../context/authContext";
import { NextPageWithLayout } from "./_app";
import AccountForm from "../components/accountForm";

const AccountPage: NextPageWithLayout = () => {
  const {user} = useAuthContext();

  return (
    <Container className="my-4">
      <Row>
        <h1>Account</h1>
      </Row>
      <Row>
        <Col lg={6}>
          <AccountForm user={user} />
        </Col>
      </Row>
    </Container>
  )
}

AccountPage.getLayout = (page: ReactNode) => {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default AccountPage;