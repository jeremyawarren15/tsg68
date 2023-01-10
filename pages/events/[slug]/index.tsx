import { ReactElement, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { NextPageWithLayout } from "../../_app";
import { getEvent } from '../../../services/eventServices';
import { getFormattedDate } from '../../../services/timeServices';
import SidebarLayout from "../../../components/sidebarLayout";
import Markdown from '../../../components/markdown';
import AttendanceButton from '../../../components/attendanceButton';
import { useRouter } from 'next/router';
import AttendeesModal from '../../../components/attendeesModal';

const EventPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [event, setEvent] = useState(null);
  const [eventText, setEventText] = useState<ReactElement|null>(null);
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (!slug) return;
    getEvent(slug as string).then((e) => {
      setEvent(e);
      setEventText(<Markdown>{e.body}</Markdown>)
    });
  }, [slug])

  const handleClose = () => {
    setShowModal(false);
  }

  if (!event) {
    return (
      <h1>Not Found</h1>
    )
  }

  return (
    <>
      <AttendeesModal show={showModal} eventId={event.id} handleClose={handleClose} />
      <Container className='my-4'>
        <h1>{event.title}</h1>
        <h3 className='text-muted'>{getFormattedDate(event.start)}</h3>
        <AttendanceButton slug={slug as string} setShowModal={setShowModal} />
        <hr />
        { eventText }
      </Container>
    </>
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