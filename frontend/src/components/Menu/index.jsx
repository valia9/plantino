import React, {useState, useEffect} from 'react';
import './style.css';
import { Outlet, Link, useLocation } from "react-router-dom";
import Logout from '../Logout';

const Menu = () => {
    
    const [isMenuActive, setIsMenuActive] = useState(true);
    const [width, setWidth] = useState(window.innerWidth)

    const location = useLocation();
        
      useEffect(() => {
        window.addEventListener("resize", () => {
          setWidth(window.innerWidth);
          if (width < 480) {
            setIsMenuActive(false)
        } else {
            setIsMenuActive(true)

        }
        });
        return () => {
          window.removeEventListener("resize", () => {});
        };
      }, [width]);

    const handleClick = () => {
        setIsMenuActive(!isMenuActive)
        console.log('click')
    }

    const handleMenuItemClick = () => {
        if (width <= 480) {
            setIsMenuActive(false)
        } else return;
    }

return (
    <div className='menu'>
            <div className={`nav-icon
            ${isMenuActive ? 'open' : ''}`}
            onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        <ul 
        className={`navbar
        ${!isMenuActive && 'invisible'}`}>
            <li></li>
            <li  
            onClick={handleMenuItemClick}
            >
                <Link to="/mylist"
                className={location.pathname === '/mylist' ? 'list--element__active': 'list--element'}>My Plants</Link>
            </li>

            <li   
            onClick={handleMenuItemClick}
            >
                <Link to="/addplant"
                className={location.pathname === '/addplant' ? 'list--element__active' : 'list--element'}>Add New Plant</Link>
            </li>

            <li 
            onClick={handleMenuItemClick}
            >
                <Link to="/plantid"
                className={location.pathname === '/plantid' ? 'list--element__active': 'list--element'}>Plant Identification</Link>
            </li>
                </ul>
                <Logout/>
        <Outlet />

    </div>
)
}

export default Menu;