import {FunctionComponent, useEffect, useState} from 'react';
import {Dropdown} from 'react-bootstrap';

const AttendanceButton: FunctionComponent = () => {
  const buttonDetails = {
    pending: {
      variant: "primary",
      text: "Pending"
    },
    attending: {
      variant: "success",
      text: "Attending"
    },
    declined: {
      variant: "error",
      text: "Declined"
    }
  }

  const [button, setButton] = useState(buttonDetails.pending);

  const getStatus = async () => {
    const res = await fetch("http://localhost:3000/api/events/7fh0QgxdGiZKGuKplfIWF6/reservation")
    const data = await res.json();
  }

  useEffect(() => {
    console.log(getStatus())
  }, [])

  const updateReservation = async (state: {text: string, variant: string}) => {
    const response = await fetch("http://localhost:3000/api/events/7fh0QgxdGiZKGuKplfIWF6/reservations", {
      method: "POST",
      body: JSON.stringify({
        state: state
      })
    });
  }


  return (
    <Dropdown>
      <Dropdown.Toggle size='sm' variant={button.variant} id="dropdown-basic">
        {button.text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => updateReservation(buttonDetails.attending)}>Attend</Dropdown.Item>
        <Dropdown.Item onClick={() => updateReservation(buttonDetails.declined)}>Decline</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AttendanceButton;