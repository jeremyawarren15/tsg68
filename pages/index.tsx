import { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app';
import Layout from '../components/layout'
import { Container, Row, Col } from 'react-bootstrap'
import campBackground from '../public/camp.jpg'
import FullWidthImageContainer from '../components/fullWidthImageContainer'

import EventType from '../types/EventType';
import { GetServerSidePropsContext } from 'next';
import initPocketBase from '../helpers/initPocketbase';
import authHelper from '../helpers/authHelper';

type Props = {
  upcomingEvents: EventType[]
};

const Home: NextPageWithLayout<Props> = () => {
  return (
    <>
      <FullWidthImageContainer
        image={campBackground}
        quality={65}
        alt="Bonfire"
      >
        <Row>
          <Col sm={5}>
            <h1>TSG - Troop 68</h1>
            <p>"He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God."</p>
            <p>- Micah 6:8</p>
          </Col>
        </Row>
      </FullWidthImageContainer>
      <Container className="pt-3">
        <Row>
          <h2>Welcome</h2>
          <p>Troop 68 is the first troop in the Indianapolis area for Troops of Saint George. Our home parish is St. John the Evangelist Catholic Church in downtown Indianapolis, but we are open to members from other parishes at this time.</p>
        </Row>
      </Container>
    </>
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

Home.getLayout = (page: ReactElement) => {
  return (
    <Layout authData={page.props.authData}>
      {page}
    </Layout>
  );
}

export default Home
