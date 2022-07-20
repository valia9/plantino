import React from 'react';
import './style.css';

import {DateTime} from 'luxon';

const Plant = ({name, lastWatered, daysBtwWatering, notes}) => {

    // displaying 'last watered' date in a readable format using 'luxon'

    let newLastWatered = lastWatered;
    let YYYY = DateTime.fromISO(newLastWatered).year;
    let MM = DateTime.fromISO(newLastWatered).month;
    let DD = DateTime.fromISO(newLastWatered).day;
    // let TZ = DateTime.fromISO(newLastWatered).zoneName;

    let dt = `${DD}.${MM}.${YYYY}`;

    // rendering the next watering date using 'luxon'

    let dbw = daysBtwWatering;
    let nextWatering = DateTime.fromISO(newLastWatered).plus({ days: dbw }).toFormat('dd.MM.yyyy');

    return (
    <div className='plant'>
        <h3 className='plant__name'>{name}</h3>
        <p>Was last watered at {dt}</p>
        <p>{daysBtwWatering} day(s) between watering recommended</p>
        <p className='plant__nextWatering'>Next watering is scheduled for {nextWatering}</p>
        <p>Notes: {notes}</p>
    </div>

    )

}

export default Plant;