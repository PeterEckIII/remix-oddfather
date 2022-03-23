import { useState } from 'react';
import { NavLink, LinksFunction } from 'remix';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from './styles.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

const UnauthNavbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);
  const closeMobileMenu = () => setOpen(false);

  return (
    <div className='navbar'>
      <NavLink className='nav-logo' to='/'>
        OF
      </NavLink>
      <div className='nav-icon' onClick={handleClick}>
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? 'nav-links active' : 'nav-links'}>
        <li className='nav-item' onClick={closeMobileMenu}>
          <NavLink to='/register' className='nav-link'>
            Sign Up
          </NavLink>
        </li>
        <li className='nav-item' onClick={closeMobileMenu}>
          <NavLink to='/login' className='nav-link'>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UnauthNavbar;
