import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const AttendeesModal = ({show, slug, handleClose}) => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    if (show) {
      fetch(`/api/events/${slug}/attending`, {
        method: "GET"
      }).then(d => d.json()).then((r) => setResponses(r))
    }
  }, [show, slug])

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Attendees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {responses?.map((e) => {
              return <li key={e}>{e}</li>
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