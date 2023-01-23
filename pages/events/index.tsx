import { useEffect } from 'react';
import { NextPageWithLayout } from '../_app';
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import PostCard from '../../components/postCard';

import EventType from '../../types/EventType';
import Layout from '../../components/layout';
import { GetServerSidePropsContext } from 'next';
import initPocketBase from '../../helpers/initPocketbase';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import authHelper from '../../helpers/authHelper';
import AuthDataType from '../../types/AuthDataType';
import { getYesterdayDateString } from '../../services/timeServices';

type Props = {
  authData: AuthDataType,
  allEvents: EventType[]
};

const EventsIndex: NextPageWithLayout<Props> = ({authData: {isLoggedIn}, allEvents}) => {
  useEffect(() => {
  }, [])

  const renderUpcomingEvents = () => {
    if (allEvents.length < 1) return (<h4>There are no upcoming events scheduled</h4>);

    return allEvents.map((post) => (
      <Col sm={4} key={post.id} className="mb-3">
        <PostCard post={post} />
      </Col>
    ));
  };

  if (!isLoggedIn) return (
    <Container className='my-4'>
      <h1>Oops...</h1>
      <p>Looks like you are not authorized to view this page. Please log in.</p>
    </Container>
  )

  return (
    <Container >
      <Row>
        <h1 className="my-4">Upcoming Events</h1>
        {renderUpcomingEvents()}
      </Row>
    </Container>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pb = await initPocketBase(context);
  const events = await pb.collection('events').getFullList(undefined, {
    filter: `start > '${getYesterdayDateString()}'`,
    sort: '+start',
  })
  const allEvents = events.map(event => event.export() as EventType);
  return {
    props: {
      authData: authHelper(pb),
      allEvents
    }
  }
}

EventsIndex.getLayout = (page) => {
  return (
    <Layout authData={page.props.authData}>
      { page }
    </Layout>
  )
}

export default EventsIndex;