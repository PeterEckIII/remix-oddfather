import { Link } from 'remix';

const Footer = ({ data }: any) => (
  <div className='footer-links'>
    {data ? (
      <ul>
        <li>
          <Link prefetch='intent' to='/'>
            Home
          </Link>
        </li>
        <li>
          <Link prefetch='intent' to='/games'>
            Games
          </Link>
        </li>
        <li>
          <Link prefetch='intent' to='/teams'>
            Teams
          </Link>
        </li>
      </ul>
    ) : null}
  </div>
);

export default Footer;
