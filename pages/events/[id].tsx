import Layout from "../../components/layout";
import { Container, Col, Row } from 'react-bootstrap';
import { NextPage, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getAllEvents, getEvent } from '../../services/eventServices';
import EventType from '../../types/EventType';
import { getFormattedDate } from '../../services/timeServices';
import ReactMarkdown from 'react-markdown';

type Props = {
  event: EventType
}

const EventPage: NextPage<Props> = ({ event: { title, eventDate, body }}) => {
  return (
    <Layout>
      <Container className='my-4'>
        <Row>
          <h1>{title}</h1>
          <h3 className='text-muted'>{getFormattedDate(eventDate)}</h3>
          <hr />
        </Row>
        <Row>
          <Col sm={8}>
            <ReactMarkdown>
              { body }
            </ReactMarkdown>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const events = await getAllEvents();
  const paths = events.map(({id}) => ({ params: { id } }))
  return {
    paths,
    fallback: 'blocking'
  }
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticProps:GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const event = await getEvent(id);

  if (!event) return { notFound: true };

  return {
    props: {
      event
    }
  }
}

export default EventPage;