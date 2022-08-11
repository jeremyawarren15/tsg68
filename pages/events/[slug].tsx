import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Layout from "../../components/layout";
import { Container, Col, Row } from 'react-bootstrap';
import { FunctionComponent } from 'react';
import { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { getAllEvents, getEvent } from '../../services/eventServices';
import { EventType } from '../../types/EventType';
import { Routes } from '../../constants/routes';
import Link from 'next/link';
import { getFormattedDate } from '../../services/timeServices';

type Props = {
  event: EventType,
  mdxSource: MDXRemoteSerializeResult
}

const EventPage: FunctionComponent<Props> = ({ event: { title, eventDate }, mdxSource}) => {
  return (
    <Layout>
      <Container className='my-4'>
        <Row>
          <Link href={Routes.Events}>Back</Link>
          <h1>{title}</h1>
          <h3 className='text-muted'>{getFormattedDate(eventDate)}</h3>
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