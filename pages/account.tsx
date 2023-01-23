import { Col, Container, Row } from "react-bootstrap";
import Layout from "../components/layout";
import { NextPageWithLayout } from "./_app";
import AccountForm from "../components/accountForm";
import { GetServerSidePropsContext } from "next";
import initPocketBase from "../helpers/initPocketbase";
import authHelper from "../helpers/authHelper";
import { ReactElement } from "react-markdown/lib/react-markdown";
import AuthDataType from "../types/AuthDataType";

type Props = {
  authData: AuthDataType
}

const AccountPage: NextPageWithLayout<Props> = ({authData: {userModel}}) => {

  return (
    <Container className="my-4">
      <Row>
        <h1>Account</h1>
      </Row>
      <Row>
        <Col lg={6}>
          <AccountForm user={userModel} />
        </Col>
      </Row>
    </Container>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pb = await initPocketBase(context);
  return {
    props: {
      authData: authHelper(pb),
    }
  }
}

AccountPage.getLayout = (page) => {
  return (
    <Layout authData={page.props.authData}>
      {page}
    </Layout>
  )
}

export default AccountPage;