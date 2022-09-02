import Layout from "../../components/layout";
import { Container, Col, Row } from 'react-bootstrap';
import { NextPage, GetServerSideProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getEvent } from '../../services/eventServices';
import EventType from '../../types/EventType';
import { getFormattedDate } from '../../services/timeServices';
import ReactMarkdown from 'react-markdown';
import { unstable_getServerSession } from "next-auth";

type Props = {
  event: EventType
}

const EventPage: NextPage<Props> = ({ event: { title, eventDate, body }}) => {
  const renderers = {
    //This custom renderer changes how images are rendered
    //we use it to constrain the max width of an image to its container
  };

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
            <ReactMarkdown
              components={{
                img: ({
                  alt,
                  src,
                  title,
                }: {
                  alt?: string;
                  src?: string;
                  title?: string;
                }) => (
                  <img
                    alt={alt}
                    src={src}
                    title={title}
                    style={{ maxWidth: '100%' }}
                  />
                ),
              }}
            >
              { body }
            </ReactMarkdown>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps:GetServerSideProps = async (context) => {
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