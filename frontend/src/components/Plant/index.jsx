import React from 'react';
import './style.css';

import {DateTime} from 'luxon';
import axios from 'axios';

const Plant = ({name, lastWatered, daysBtwWatering, notes, id}) => {

    let newLastWatered = lastWatered;
    let lw = DateTime.fromISO(newLastWatered).toFormat('dd.MM.yyyy');
    let dt = DateTime.now().toFormat('dd.MM.yyyy');

    // rendering the next watering date using 'luxon'

    let dbw = daysBtwWatering;
    let nextWatering = DateTime.fromISO(newLastWatered).plus({ days: dbw }).toFormat('dd.MM.yyyy');

    const handleClick = async (e) => {
        e.preventDefault();

        const id = e.target.value;
        const find = (
            {_id: id}
        )

            try {
                const body = JSON.parse(JSON.stringify(find))
                await axios.patch('mylist', body);
                window.location.reload();
            } catch (err) {
                console.error("error", err);
            }
        };
    


    return (
    <div className='plant'>
        <h3 className='plant__name'>{name}</h3>
            <p>Last watered: {lw}</p>
            <p className='plant__nextWatering'>
                Next watering is scheduled for {dt === nextWatering ? `today` : `${nextWatering}`}
            </p>
        <button
        className='water-btn'
        type='submit'
        name='lastWatered_update'
        value={id}
        onClick={handleClick}>
            Water
        </button>
    </div>

    )

}

export default Plant;