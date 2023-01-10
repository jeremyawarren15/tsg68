import { useEffect, useState } from "react";
import client from "../services/pocketbaseService";
import { Modal, Button } from "react-bootstrap";

const AttendeesModal = ({show, eventId, handleClose}) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (show) {
      client.collection("responses").getFullList(undefined, {
        filter: `event = "${eventId}" && response = "attending"`,
        expand: 'user'
      }).then((r) => setResponses(r))
    }
  }, [show, eventId])

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Attendees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {responses.map((e) => {
              return <li key={e.id}>{e.expand.user.name}</li>
            })}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  )
}

export default AttendeesModal;