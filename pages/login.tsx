import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import Layout from '../components/layout';
import { NextPageWithLayout } from './_app';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/authContext';

const Login: NextPageWithLayout= () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signIn} = useAuthContext();

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="button" onClick={(e) => signIn(email, password)}>
        Submit
      </Button>
    </Form>
  );
}

Login.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Login;