import React from 'react';
import './style.css';

import {DateTime} from 'luxon';

const Plant = ({name, lastWatered, daysBtwWatering, notes, _id}) => {

    let newLastWatered = lastWatered;
    let lw = DateTime.fromISO(newLastWatered).toFormat('dd.MM.yyyy');
    let dt = DateTime.now().toFormat('dd.MM.yyyy');

    // rendering the next watering date using 'luxon'

    let dbw = daysBtwWatering;
    let nextWatering = DateTime.fromISO(newLastWatered).plus({ days: dbw }).toFormat('dd.MM.yyyy');

    // const handleClick = () => {

    // }


    return (
    <div className='plant'>
        <h3 className='plant__name'>{name}</h3>
            <p>Last watered: {lw}</p>
            <p className='plant__nextWatering'>
                Next watering is scheduled for {dt === nextWatering ? `today` : `${nextWatering}`}
            </p>
        <button className='water-btn'>Water</button>
    </div>

    )

}

export default Plant;