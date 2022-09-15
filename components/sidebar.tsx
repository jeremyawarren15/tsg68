import {Nav} from 'react-bootstrap';
import { Routes } from '../constants/routes';
import NavLink from './navLink';

const Sidebar = () => {
  return (
    <>
      <Nav className='flex-column'>
        <Nav.Item className='mb-2'>
          <NavLink className='rounded' href={Routes.Events}>Events</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink className='rounded' href={Routes.Faq}>FAQs</NavLink>
        </Nav.Item>
      </Nav>
    </>
  )
}

export default Sidebar;