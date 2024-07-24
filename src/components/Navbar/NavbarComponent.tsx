
import { NavLink } from 'react-router-dom';
import './NavbarComponent.css'
import { useState } from 'react';
import { useLoginContext } from '../../services/LoginContext';

const NavbarComponent = () => {

  const { getUserData } = useLoginContext();
  const userData = getUserData();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
        <NavLink className="title-page" to="/" >
          <h1 className='title'>Tienda</h1>
        </NavLink>
        <button className="menu-button" onClick={toggleSidenav}>
          ☰
        </button>
        <div className={`nav-links ${isOpen ? 'open' : ''}`} onClick={toggleSidenav}>
          <NavLink to="/" className="nav-link" onClick={toggleSidenav}>Home</NavLink>
          
          {userData?.isAdmin ?
            <NavLink to="/control-panel" className="nav-link" onClick={toggleSidenav}>Panel de control</NavLink> :
            <NavLink to="/favorites" className="nav-link" onClick={toggleSidenav}>Favorites</NavLink>
          }
          <NavLink to="/login" className="nav-link" onClick={toggleSidenav}>
            {userData.id ? 'Logout' : 'Login'}
          </NavLink>
        </div>
    </nav>
  )
}

export default NavbarComponent