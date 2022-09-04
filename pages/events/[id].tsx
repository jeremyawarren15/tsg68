import { ReactNode } from 'react';
import { Container } from 'react-bootstrap';
import { GetServerSideProps } from 'next'
import { NextPageWithLayout } from "../_app";
import { ParsedUrlQuery } from 'querystring'
import { getEvent } from '../../services/eventServices';
import EventType from '../../types/EventType';
import { getFormattedDate } from '../../services/timeServices';
import ReactMarkdown from 'react-markdown';
import SidebarLayout from "../../components/sidebarLayout";

type Props = {
  event: EventType
}

const EventPage: NextPageWithLayout<Props> = ({ event: { title, eventDate, body }}) => {
  return (
    <Container className='my-4'>
      <h1>{title}</h1>
      <h3 className='text-muted'>{getFormattedDate(eventDate)}</h3>
      <hr />
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
    </Container>
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

EventPage.getLayout = (page: ReactNode) => {
  return (
    <SidebarLayout>
      { page }
    </SidebarLayout>
  )
}

export default EventPage;