import { ReactElement } from 'react'
import type { NextPageWithLayout } from './_app';
import Layout from '../components/layout'
import { Container, Row, Col } from 'react-bootstrap'
import campBackground from '../public/camp.jpg'
import FullWidthImageContainer from '../components/fullWidthImageContainer'
import PostCard from '../components/postCard';
import Link from 'next/link'
import { Routes } from '../constants/routes';

import EventType from '../types/EventType';
import { getAllEventsAsc } from '../services/eventServices';

type Props = {
  upcomingEvents: EventType[]
};

const Home: NextPageWithLayout<Props> = ({ upcomingEvents }) => {
  const renderPosts = () => {
    if (upcomingEvents.length < 1) return (<h4>There are no upcoming events scheduled</h4>);

    return upcomingEvents.map((post) => (
      <Col sm={4} key={post.id} className="mb-3">
        <PostCard post={post} />
      </Col>
    ))
  };

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
      {
        <Container className="pb-3">
          <Link href={Routes.Events}><h2>Upcoming Events</h2></Link>
          <Row>
            {renderPosts()}
          </Row>
        </Container>
      }
    </>
  )
}

export const getServerSideProps = async () => {
  const events = await getAllEventsAsc()
  console.log(events)

  const upcomingEvents =
    events
      .filter(event => new Date(event.date) > new Date())
      .slice(0,3)
      .sort(function (a, b) {
        return  new Date(a.date).getTime() - new Date(b.date).getTime();
      });

  return {
    props: {
      upcomingEvents
    }
  }
}

Home.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      {page}
    </Layout>
  );
}

export default Home
