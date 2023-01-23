import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Layout from "../components/layout";
import PocketBase from 'pocketbase';
import { GetServerSidePropsContext } from "next";
import initPocketBase from "../helpers/initPocketbase";
import authHelper from "../helpers/authHelper";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const resetPassword = () => {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_API_URL)
    pb.collection('users').requestPasswordReset(email).then(() => {
      setRequestSent(true);
    })
  }

  const renderForm = () => {
    return (
      <>
        <h1>Reset Password</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="button" onClick={() => resetPassword()}>
            Submit
          </Button>
        </Form>
      </>
    )
  }

  const renderPage = () => {
    if (requestSent) return <h2>The password reset has been sent to your email.</h2>

    return renderForm();
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col lg={6} style={{marginLeft: "auto", marginRight: "auto"}}>
          {renderPage()}
        </Col>
      </Row>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pb = await initPocketBase(context);
  return {
    props: {
      authData: {
        ...authHelper(pb)
      }
    }
  }
}

ResetPassword.getLayout = (page) => {
  return (
    <Layout authData={page.props.authData}>
      {page}
    </Layout>
  );
}


export default ResetPassword;