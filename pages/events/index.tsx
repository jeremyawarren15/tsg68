import { ReactNode, useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import PostCard from '../../components/postCard';

import { getAllCategorizedEvents } from '../../services/eventServices';
import EventType from '../../types/EventType';
import Layout from '../../components/layout';
import { useAuthContext } from '../../context/authContext';

type Props = {
  upcomingEvents: EventType[]
  expiredEvents: EventType[]
};

const EventsIndex: NextPageWithLayout<Props> = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [expiredEvents, setExpiredEvents] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { loggedIn } = useAuthContext();

  useEffect(() => {
    getAllCategorizedEvents().then(({upcomingEvents, expiredEvents}) => {
      setUpcomingEvents(upcomingEvents);
      setExpiredEvents(expiredEvents);
    }).catch(() => {
      setIsError(true);
    }).finally(() => {
      setIsLoading(false)
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

  if (isLoading) return (
    <div className='my-4' style={{marginLeft: "auto", marginRight: "auto"}}>
      <Spinner variant='danger' />
    </div>
  )

  if (!loggedIn || isError|| !event) return (
    <Container className='my-4'>
      <h1>Oops...</h1>
      <p>Looks like we had trouble getting the events. Try again.</p>
    </Container>
  )

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