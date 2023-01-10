import {FunctionComponent, useEffect, useState} from 'react';
import {Button, ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';
import client from '../services/pocketbaseService';

type Props = {
  slug: string,
  setShowModal: (newState: boolean) => void
}

const AttendanceButton: FunctionComponent<Props> = ({slug, setShowModal}) => {
  const buttonDetails = {
    "pending": {
      variant: "primary",
      text: "Pending"
    },
    "attending": {
      variant: "success",
      text: "Attending"
    },
    "declined": {
      variant: "danger",
      text: "Declined"
    }
  }

  const [button, setButton] = useState(undefined);

  useEffect(() => {
    client.send(`/response/${slug}`, {
      method: "GET"
    }).then((state) => {
      setButton(buttonDetails[state])
    })
  }, [slug])

  const updateReservation = async (state) => {
    client.send("/response", {
      method: "POST",
      body: {
        response: state,
        event: slug
      }
    }).then(() => {
      setButton(buttonDetails[state])
    })
  }

  if (!slug || !button) return null;

  return (
    <ButtonGroup>
      <DropdownButton as={ButtonGroup} variant={button.variant} title={button.text}>
        <Dropdown.Item onClick={() => updateReservation("attending")}>Attend</Dropdown.Item>
        <Dropdown.Item onClick={() => updateReservation("declined")}>Decline</Dropdown.Item>
      </DropdownButton>
      <Button variant='light' onClick={() => setShowModal(true)}>Attendees</Button>
    </ButtonGroup>
  )
}

export default AttendanceButton;