import { useState } from 'react';
import { NavLink } from 'remix';
import type { LinksFunction } from 'remix';
import styles from './styles.css';
import { FiMenu, FiX } from 'react-icons/fi';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => setOpen(!open);
  const closeMobileMenu = () => setOpen(false);

  return (
    <div className='navbar'>
      <NavLink className='nav-logo' to='/dashboard'>
        OF
      </NavLink>
      <div className='nav-icon' onClick={handleClick}>
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? 'nav-links active' : 'nav-links'}>
        <li className='nav-item' onClick={closeMobileMenu}>
          <NavLink to='/dashboard' className='nav-link'>
            Home
          </NavLink>
        </li>
        <li className='nav-item' onClick={closeMobileMenu}>
          <NavLink to='/profile' className='nav-link'>
            Profile
          </NavLink>
        </li>
        <li className='nav-item' onClick={closeMobileMenu}>
          <NavLink to='/login' className='nav-link'>
            Login
          </NavLink>
        </li>
        <li className='nav-item' onClick={closeMobileMenu}>
          <NavLink to='/logout' className='nav-link'>
            Log Out
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
