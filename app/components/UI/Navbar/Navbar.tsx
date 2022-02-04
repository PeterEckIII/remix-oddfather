import { useEffect, useState } from "react";
import { Link, LoaderFunction, useFetcher, useLoaderData } from "remix";
import type { LinksFunction } from "remix";
import styles from "./styles.css";
import { FiMenu, FiX } from "react-icons/fi";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);
  const closeMobileMenu = () => setOpen(false);

  return (
    <div className="navbar">
      <Link className="nav-logo" to="/">
        OF
      </Link>
      <div className="nav-icon" onClick={handleClick}>
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item" onClick={closeMobileMenu}>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item" onClick={closeMobileMenu}>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
        <li className="nav-item" onClick={closeMobileMenu}>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
        <li className="nav-item" onClick={closeMobileMenu}>
          <Link to="/register" className="nav-link">
            Sign Up
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
