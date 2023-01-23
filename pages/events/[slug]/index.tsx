import { ReactElement, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { NextPageWithLayout } from "../../_app";
import { getFormattedDate } from '../../../services/timeServices';
import Markdown from '../../../components/markdown';
import AttendanceButton from '../../../components/attendanceButton';
import { useRouter } from 'next/router';
import AttendeesModal from '../../../components/attendeesModal';
import Layout from '../../../components/layout';
import { GetServerSidePropsContext } from 'next';
import initPocketBase from '../../../helpers/initPocketbase';
import authHelper from '../../../helpers/authHelper';
import EventType from '../../../types/EventType';
import AuthDataType from '../../../types/AuthDataType';

type Props = {
  authData: AuthDataType,
  eventModel: EventType
}

const EventPage: NextPageWithLayout<Props> = ({eventModel, authData: {isLoggedIn}}) => {
  const router = useRouter();
  const {slug} = router.query;
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false);
  }

  if (!isLoggedIn) return (
    <Container className='my-4'>
      <h1>Oops...</h1>
      <p>Looks like you are not authorized to view this page. Please log in.</p>
    </Container>
  )

  return (
    <>
      <AttendeesModal show={showModal} slug={slug as string} handleClose={handleClose} />
      <Container className='my-4'>
        <h1>{eventModel.title}</h1>
        <h3 className='text-muted'>{getFormattedDate(eventModel.start)}</h3>
        <AttendanceButton slug={slug as string} setShowModal={setShowModal} />
        <hr />
        <Markdown>{eventModel.body}</Markdown>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const pb = await initPocketBase(context);
  const { slug } = context.params;
  const records = await pb.collection('events').getFullList(undefined, {
    filter: `slug = "${slug}"`
  });
  const event = records[0].export() as EventType;
  return {
    props: {
      authData: authHelper(pb),
      eventModel: event
    }
  }
}

EventPage.getLayout = (page: ReactElement) => {
  return (
    <Layout authData={page.props.authData}>
      { page }
    </Layout>
  )
}

export default EventPage;