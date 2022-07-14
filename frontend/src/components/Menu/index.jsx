import React, {useState} from 'react';
import './style.css';

import MyList from '../MyList';
import NewPlant from '../NewPlant';

const Menu = () => {

    const [isListActive, setListActive] = useState(false);
    const [isNewActive, setNewActive] = useState(false);
    const [isSettingsActive, setSettingsActive] = useState(false);

    const handleListClick = (event) => {
        event.stopPropagation();
        setListActive(!isListActive);
        setNewActive(false);
        setSettingsActive(false);
        event.preventDefault();
    }

    const handleNewClick = (event) => {
        event.stopPropagation();
        setNewActive(!isNewActive);
        setListActive(false);
        setSettingsActive(false);
        event.preventDefault();
    }

    const handleSettingsClick = (event) => {
        event.stopPropagation();
        setSettingsActive(!isSettingsActive);
        setNewActive(false);
        setListActive(false);
        event.preventDefault();
    }

return (
    <div className='menu'>
        <ul className='navbar'>
            <li 
            className={isListActive ? 'active': null}  
            onClick={handleListClick}
            >
                My Plants
            </li>
                {isListActive && <MyList />}

            <li 
            className={isNewActive ? 'active' : null}  
            onClick={handleNewClick}
            >
                Add New Plant
            </li>
                {isNewActive && <NewPlant />}

            <li 
            className={isSettingsActive ? 'active': null}  
            onClick={handleSettingsClick}
            >
                Settings
            </li>

        </ul>
    </div>
)
}

export default Menu;