import Link from 'next/Link'
import Nav from 'react-bootstrap/Nav'
import { FunctionComponent, ReactNode } from 'react'
import { Url } from 'url'

type Props = {
  children: ReactNode,
  href: string | Url
}

const NavLink: FunctionComponent<Props> = ({ children, href }) => {
  return (
    <Link href={href} passHref>
      <Nav.Link>{children}</Nav.Link>
    </Link>
  )
}

export default NavLink