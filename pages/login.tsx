import Button from 'react-bootstrap/Button';
import { Alert, Col, Container, FormGroup, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import Layout from '../components/layout';
import { NextPageWithLayout } from './_app';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import client from '../services/pocketbaseService';
import {setCookie} from 'cookies-next';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import initPocketBase from '../helpers/initPocketbase';
import authHelper from '../helpers/authHelper';
import AuthDataType from '../types/AuthDataType';

type Props = {
  authData: AuthDataType
}

const Login: NextPageWithLayout<Props> = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const schema = yup.object().shape({
    email: yup.string().required("Email is required."),
    password: yup.string().required("Password is required.")
  })
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async ({email, password}) => {

    await client.collection('users').authWithPassword(email, password).then(() => {
      const authStoreLocalStorage = localStorage.getItem("pocketbase_auth");
      if (authStoreLocalStorage) {
        // Set the authStore cookie
        setCookie("pb_auth", authStoreLocalStorage, {
          maxAge: 60 * 60 * 24 * 14,
          path: "/",
          secure: true,
          sameSite: "strict",
        });

        //Remove the authStore from localstorage
        localStorage.removeItem("pocketbase_auth");

        router.push("/events");
      }
    }).catch((e) => {
      if (e.message === "Something went wrong while processing your request.") {
        setError("There was an issue communicating with the server. Try again later.")
      } else if (e.message === "Failed to authenticate.") {
        setError("Invalid credentials. Try again.")
      } else {
        setError("An error occurred while trying to sign in. Try again.")
      }
    });
  }

  const renderError = () => {
    if (!error) return;

    return <Alert variant='danger'>{error}</Alert>
  }

  return (
    <Container className="pt-3">
      <Row>
        <Col lg={6} style={{marginLeft: "auto", marginRight: "auto"}}>
          <h1>Sign In</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {renderError()}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control placeholder="Enter email" {...register("email")} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid" >
                {errors.email?.message as string}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" {...register("password")} isInvalid={!!errors.password} />
              <Form.Control.Feedback type="invalid" >
                {errors.password?.message as string}
              </Form.Control.Feedback>
            </Form.Group>
            <FormGroup>
              <Link href="/reset-password">Reset Password</Link>
            </FormGroup>
            <Button type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
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

Login.getLayout = (page: ReactElement) => {
  return (
    <Layout authData={page.props}>
      {page}
    </Layout>
  );
}

export default Login;