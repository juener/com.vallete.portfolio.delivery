import { Link, LinkProps } from 'react-router-dom';

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps){
  return <Link {...props} />
}