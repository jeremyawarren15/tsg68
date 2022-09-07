import { ReactElement, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextPageWithLayout } from "../_app";
import { ParsedUrlQuery } from 'querystring'
import { getEvent } from '../../services/eventServices';
import EventType from '../../types/EventType';
import { getFormattedDate } from '../../services/timeServices';
import SidebarLayout from "../../components/sidebarLayout";
import { getAllEvents } from '../../services/eventServices';
import Markdown from '../../components/markdown';

type Props = {
  event: EventType
}

const EventPage: NextPageWithLayout<Props> = ({ event: { title, eventDate, body }}) => {
  const [event, setEvent] = useState<ReactElement|null>(null);

  useEffect(() => {
    setEvent(<Markdown>{body}</Markdown>)
  }, [body])

  return (
    <Container className='my-4'>
      <h1>{title}</h1>
      <h3 className='text-muted'>{getFormattedDate(eventDate)}</h3>
      <hr />
      { event }
    </Container>
  );
}

interface IParams extends ParsedUrlQuery {
  id: string
}

export const getStaticPaths:GetStaticPaths = async () => {
  const events = await getAllEvents();
  const paths = events.map(({ id }) => ({ params: { id } }))
  return {
    paths,
    fallback: 'blocking'
  }
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

EventPage.getLayout = (page: ReactElement) => {
  return (
    <SidebarLayout>
      { page }
    </SidebarLayout>
  )
}

export default EventPage;