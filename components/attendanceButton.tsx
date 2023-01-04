import {FunctionComponent, useEffect, useState} from 'react';
import {Dropdown} from 'react-bootstrap';
import client from '../services/pocketbaseService';

type Props = {
  slug: string
}

const AttendanceButton: FunctionComponent<Props> = ({slug}) => {
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
    client.collection("responses").getFullList(1, {
      filter: `event.slug = "${slug}" && user.id = "${client.authStore.model.id}"`
    }).then((res) => {
      if (res.length === 0) {
        setButton(buttonDetails.pending)
      } else {
        setButton(buttonDetails[res[0].response])
      }
    })
  }, [slug])

  const updateReservation = async (state) => {
    client.collection("responses").getFullList(1, {
      filter: `event.slug = "${slug}" && user.id = "${client.authStore.model.id}"`
    }).then((responses) => {
      if (responses.length == 0) {
        client.collection("events").getFullList(undefined, {
          filter: `slug = "${slug}"`
        }).then((event) => {
          const data = {
            "user": client.authStore.model.id,
            "event": event[0].id,
            "response": state
          }
          client.collection("responses").create(data)
        })
      } else {
        const response = responses[0];
        client.collection("events").getFullList(undefined, {
          filter: `slug = "${slug}"`
        }).then((event) => {
          const data = {
            "user": client.authStore.model.id,
            "event": event[0].id,
            "response": state
          }
          client.collection("responses").update(response.id, data)
        })
      }
      setButton(buttonDetails[state])
    })
  }

  if (!slug || !button) return null;

  return (
    <Dropdown>
      <Dropdown.Toggle size='sm' variant={button.variant} id="dropdown-basic">
        {button.text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => updateReservation("attending")}>Attend</Dropdown.Item>
        <Dropdown.Item onClick={() => updateReservation("declined")}>Decline</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AttendanceButton;