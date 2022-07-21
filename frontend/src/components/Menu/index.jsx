import React, {useState} from 'react';
import './style.css';

import MyList from '../MyList';
import NewPlant from '../NewPlant';
import PlantId from '../PlantId';

const Menu = () => {

    const [isListActive, setListActive] = useState(true);
    const [isNewActive, setNewActive] = useState(false);
    const [isPlantIdActive, setPlantIdActive] = useState(false);

    const handleListClick = (event) => {
        event.stopPropagation();
        setListActive(!isListActive);
        setNewActive(false);
        setPlantIdActive(false);
        event.preventDefault();
    }

    const handleNewClick = (event) => {
        event.stopPropagation();
        setNewActive(!isNewActive);
        setListActive(false);
        setPlantIdActive(false);
        event.preventDefault();
    }

    const handlePlantIdClick = (event) => {
        event.stopPropagation();
        setPlantIdActive(!isPlantIdActive);
        setNewActive(false);
        setListActive(false);
        event.preventDefault();
    }

return (
    <div className='menu'>
        <ul className='navbar'>
            <li></li>
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
            className={isPlantIdActive ? 'active': null}  
            onClick={handlePlantIdClick}
            >
                Plant Identification
            </li>
                {isPlantIdActive && <PlantId />}

        </ul>
    </div>
)
}

export default Menu;