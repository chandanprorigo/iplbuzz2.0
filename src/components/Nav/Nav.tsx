import { Link } from 'react-router-dom';
import './Nav.scss';
import { FC } from 'react';
import GoogleTranslate from '../common/LanguageSelector/GoogleTranlate';

const Nav : FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/">IPLBUZZ 2.0</Link>
        </li>
        <li className='nav-item'>
          <GoogleTranslate />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;