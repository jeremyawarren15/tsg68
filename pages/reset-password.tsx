import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Layout from "../components/layout";
import client from "../services/pocketbaseService";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const resetPassword = () => {
    client.collection('users').requestPasswordReset(email).then(() => {
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

ResetPassword.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  );
}


export default ResetPassword;