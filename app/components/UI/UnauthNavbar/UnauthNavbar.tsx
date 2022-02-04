import { useState } from "react";
import { Link } from "remix";
import { FiMenu, FiX } from "react-icons/fi";

const UnauthNavbar = () => {
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
          <Link to="/register" className="nav-link">
            Sign Up
          </Link>
        </li>
        <li className="nav-item" onClick={closeMobileMenu}>
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UnauthNavbar;
