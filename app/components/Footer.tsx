import { Link } from "remix";

const Footer = () => (
  <div className="links">
    <ul>
      <li>
        <Link prefetch="intent" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link prefetch="intent" to="/games">
          Games
        </Link>
      </li>
      <li>
        <Link prefetch="intent" to="/teams">
          Teams
        </Link>
      </li>
    </ul>
  </div>
);

export default Footer;
