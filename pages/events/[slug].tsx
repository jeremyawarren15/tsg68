import { ReactElement, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { NextPageWithLayout } from "../_app";
import { getEvent } from '../../services/eventServices';
import { getFormattedDate } from '../../services/timeServices';
import SidebarLayout from "../../components/sidebarLayout";
import Markdown from '../../components/markdown';
import AttendanceButton from '../../components/attendanceButton';
import { useRouter } from 'next/router';

const EventPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [event, setEvent] = useState(null);
  const [eventText, setEventText] = useState<ReactElement|null>(null);

  useEffect(() => {
    if (!slug) return;
    getEvent(slug as string).then((e) => {
      setEvent(e);
      setEventText(<Markdown>{e.body}</Markdown>)
    });
  }, [slug])

  if (!event) {
    return (
      <h1>Not Found</h1>
    )
  }

  return (
    <Container className='my-4'>
      <h1>{event.title}</h1>
      <h3 className='text-muted'>{getFormattedDate(new Date)}</h3>
      <AttendanceButton slug={slug as string} />
      <hr />
      { eventText }
    </Container>
  );
}

EventPage.getLayout = (page: ReactElement) => {
  return (
    <SidebarLayout>
      { page }
    </SidebarLayout>
  )
}

export default EventPage;