import { ReactElement, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { NextPageWithLayout } from "../../_app";
import { getEvent } from '../../../services/eventServices';
import { getFormattedDate } from '../../../services/timeServices';
import Markdown from '../../../components/markdown';
import AttendanceButton from '../../../components/attendanceButton';
import { useRouter } from 'next/router';
import AttendeesModal from '../../../components/attendeesModal';
import Layout from '../../../components/layout';
import { useAuthContext } from '../../../context/authContext';

const EventPage: NextPageWithLayout = () => {
  const router = useRouter();
  const {slug} = router.query;
  const [event, setEvent] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const { loggedIn } = useAuthContext();

  useEffect(() => {
    if (!slug) return;
    getEvent(slug as string).then((e) => {
      setEvent(e);
    }).catch(() => {
      setIsError(true);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [slug])

  const handleClose = () => {
    setShowModal(false);
  }

  if (isLoading) return (
    <div className='my-4' style={{marginLeft: "auto", marginRight: "auto"}}>
      <Spinner variant='danger' />
    </div>
  )

  if (!loggedIn || isError|| !event) return (
    <Container className='my-4'>
      <h1>Oops...</h1>
      <p>No event was found for this url.</p>
    </Container>
  )

  return (
    <>
      <AttendeesModal show={showModal} eventId={event.id} handleClose={handleClose} />
      <Container className='my-4'>
        <h1>{event.title}</h1>
        <h3 className='text-muted'>{getFormattedDate(event.start)}</h3>
        <AttendanceButton slug={slug as string} setShowModal={setShowModal} />
        <hr />
        <Markdown>{event.body}</Markdown>
      </Container>
    </>
  );
}

EventPage.getLayout = (page: ReactElement) => {
  return (
    <Layout>
      { page }
    </Layout>
  )
}

export default EventPage;