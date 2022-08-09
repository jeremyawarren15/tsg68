import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Layout from "../../components/layout";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FunctionComponent } from 'react';
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getAllEvents, getEvent } from '../../services/eventServices';
import { EventType } from '../../types/EventType';

type Props = {
  event: EventType,
  mdxSource: MDXRemoteSerializeResult
}

const EventPage: FunctionComponent<Props> = ({ event: { title, eventDate }, mdxSource}) => {
  return (
    <Layout>
      <Container className='my-4'>
        <Row>
          <h1>{title}</h1>
          <h3 className='text-muted'>{new Date(eventDate).toDateString()}</h3>
          <hr />
        </Row>
        <Row>
          <Col sm={8}>
            <MDXRemote {...mdxSource}  />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const events = await getAllEvents();
  const paths = events.map(({slug}) => ({ params: { slug } }))
  return {
    paths,
    fallback: false
  }
}

interface IParams extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps:GetStaticProps = async (context) => {
  const {slug} = context.params as IParams;
  const event = await getEvent(slug);
  const mdxSource = await serialize(event.body);

  return {
    props: {
      event,
      mdxSource
    }
  }
}

export default EventPage;