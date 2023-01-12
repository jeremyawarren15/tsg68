import { ReactNode, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { Container, Col, Row } from 'react-bootstrap';
import PostCard from '../../components/postCard';

import { getAllCategorizedEvents } from '../../services/eventServices';
import EventType from '../../types/EventType';
import Layout from '../../components/layout';

type Props = {
  upcomingEvents: EventType[]
  expiredEvents: EventType[]
};

const EventsIndex: NextPageWithLayout<Props> = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);

  useEffect(() => {
    getAllCategorizedEvents().then(({upcomingEvents, expiredEvents}) => {
      setUpcomingEvents(upcomingEvents);
      setExpiredEvents(expiredEvents);
    });
  }, [])

  const renderUpcomingEvents = () => {
    if (upcomingEvents.length < 1) return (<h4>There are no upcoming events scheduled</h4>);

    return upcomingEvents.map((post) => (
      <Col sm={4} key={post.id} className="mb-3">
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
          <Col sm={4} key={post.id} className="mb-3">
            <PostCard post={post} />
          </Col>
        ))}
      </>
    );
  }

  return (
    <Container >
      <Row>
        <h1 className="my-4">Upcoming Events</h1>
        {renderUpcomingEvents()}
      </Row>
      <Row>
        {renderPastEvents()}
      </Row>
    </Container>
  );
};

EventsIndex.getLayout = (page: ReactNode) => {
  return (
    <Layout>
      { page }
    </Layout>
  )
}

export default EventsIndex;