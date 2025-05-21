import { Link } from 'react-router-dom';
import './Nav.scss';
import { FC } from 'react';

const Nav : FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/">IPLBUZZ 2.0</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;