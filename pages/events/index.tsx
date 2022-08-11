import type { NextPage } from 'next'
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../../components/postCard';

import { getAllEventsAsc } from '../../services/eventServices';
import Layout from '../../components/layout';
import { EventType } from '../../types/EventType';

type Props = {
  upcomingEvents: EventType[]
  expiredEvents: EventType[]
};

const EventsIndex: NextPage<Props> = ({ upcomingEvents, expiredEvents }) => {
  const renderUpcomingEvents = () => {
    if (upcomingEvents.length < 1) return (<h4>There are no upcoming events scheduled</h4>);

    return upcomingEvents.map((post) => (
      <Col sm={4} key={post.slug} className="mb-3">
        <PostCard post={post} />
      </Col>
    ));
  };

  const renderPastEvents = () => {
    if (expiredEvents.length < 1) return;

    return (
      <>
        <h1 className="my-4">Past Events</h1>
        {expiredEvents.map((post) => (
          <Col sm={4} key={post.slug} className="mb-3">
            <PostCard post={post} />
          </Col>
        ))}
      </>
    );
  }

  return (
    <Layout>
      <Container>
        <Row>
          <h1 className="my-4">Upcoming Events</h1>
          {renderUpcomingEvents()}
        </Row>
        <Row>
          {renderPastEvents()}
        </Row>
      </Container>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const events = await getAllEventsAsc();

  const upcomingEvents = events.filter(post => new Date(post.eventDate) >= new Date());
  const expiredEvents = events.filter(post => new Date(post.eventDate) < new Date());

  return {
    props: {
      upcomingEvents,
      expiredEvents
    }
  }
}

export default EventsIndex;