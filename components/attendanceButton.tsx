import {FunctionComponent, useEffect, useState} from 'react';
import {Button, ButtonGroup, Dropdown, DropdownButton} from 'react-bootstrap';

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
    },
    "loading": {
      variant: "light",
      text: "Loading..."
    }
  }

  const [button, setButton] = useState(buttonDetails["loading"]);

  useEffect(() => {
    fetch(`/api/events/${slug}/response`,{
      method: 'GET'
    }).then(data => data.json()).then((state) => {
      setButton(buttonDetails[state])
    })
  }, [slug])

  const updateReservation = async (state) => {
    const body = {
      response: state
    }
    fetch(`/api/events/${slug}/response`, {
      method: "POST",
      body: JSON.stringify(body)
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