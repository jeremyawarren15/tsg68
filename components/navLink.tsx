import Link from 'next/link'
import Nav from 'react-bootstrap/Nav'
import { FunctionComponent, ReactNode } from 'react'
import { Url } from 'url'
import { useRouter } from 'next/router';

type Props = {
  className?: string | undefined,
  children: ReactNode,
  href: string | Url
}

const NavLink: FunctionComponent<Props> = ({ className, children, href }) => {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <Nav.Link active={router.pathname === href} className={className || null}>{children}</Nav.Link>
    </Link>
  )
}

export default NavLink