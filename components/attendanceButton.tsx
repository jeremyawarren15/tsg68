import {useState} from 'react';
import {Dropdown} from 'react-bootstrap';

const AttendanceButton = () => {
  const [button, setButton] = useState({text: "No Response", variant: "secondary"});

  return (
    <Dropdown>
      <Dropdown.Toggle size='sm' variant={button.variant} id="dropdown-basic">
      {button.text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setButton({text: "Attending", variant: "success"})}>Attending</Dropdown.Item>
        <Dropdown.Item onClick={() => setButton({text: "Not Attending", variant: "danger"})}>Not Attending</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default AttendanceButton;