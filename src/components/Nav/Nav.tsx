import { Link } from 'react-router-dom';
import './Nav.scss';
import { FC } from 'react';
import GoogleTranslate from '../common/LanguageSelector/GoogleTranlate';
import ApiTranslate from '../fundamentals/ApiTranslate';

const Nav : FC = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {/* <li className='nav-list'>
            <p>Microsoft Translate</p>
            <ApiTranslate />
        </li> */}
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