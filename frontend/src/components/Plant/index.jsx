import React, {useState} from 'react';
import './style.css';

import {DateTime} from 'luxon';
import { toast } from 'react-toastify';
import axios from 'axios';

const Plant = ({name, lastWatered, daysBtwWatering, notes, id}) => {

    const [isPlantActive, setIsPlantActive] = useState(false);


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
                toast.info(`Watering ${name}...`, {
                    theme: "colored",
                    isLoading: false,
                    delay: 1000,
                    autoClose: 10000
                  })
                await axios.patch('/api', body)
            } catch (err) {
                console.error("error", err);
            }

        };

        const handleDeletePlant = async (e) => {
            e.preventDefault();
            
            const id = e.target.value;
            
            try {
                toast.success(`Successfully deleted ${name}`, {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 7000
                  });
                await axios.delete('/api', { data: { _id: id }});
                window.location.reload();
                } catch (err) {
                    console.error("error", err);
                }
            };

        const handlePlantClick = () => {
            setIsPlantActive(!isPlantActive);
        }

    return (
    <div className='plant'>

        <p className='stars'>🌱🌱🌱</p>
        <h3 className='plant__name' onClick={handlePlantClick}>
            {name}
            { isPlantActive 
            ? <span className="material-symbols-outlined expand-more"> expand_less</span>
            : <span className="material-symbols-outlined expand-more">expand_more</span>
            }
        </h3>
        
            <p>Last watered: {dt === lw ? `today` : `${lw}`}</p>
            <p className='plant__nextWatering'>
                Next watering: {dt === nextWatering ? `today` : `${nextWatering}`}
            </p>
        
        <button
        className='water-btn'
        type='submit'
        name='lastWatered_update'
        value={id}
        onClick={handleClick}>
            Water
        </button>

        {isPlantActive 
        && 
        <button
        type='submit'
        className='app--button'
        name='lastWatered_update'
        value={id}
        onClick={handleDeletePlant}>
            Delete
        </button>
        }
        
        {isPlantActive 
        &&
        (notes.length > 0)
        && 
        <p>{notes}</p> 
        }
        
    </div>

    )

}

export default Plant;