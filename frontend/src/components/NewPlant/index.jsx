import React, {useState} from 'react';
import './style.css';

import axios from 'axios';

const NewPlant = () => {

    // specifying 'today' for a future reference

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();

      if(dd<10) { dd = '0'+dd } 

      if(mm<10) { mm = '0'+mm } 
      
      today = yyyy + '-' + mm + '-' + dd;

    const [formData, setFormData] = useState({
        name: "",
        lastWatered: today,
        daysBtwWatering: 1,
        notes: "",
    })

    const { name, lastWatered, daysBtwWatering, notes } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const newPlant =({
            name,
            lastWatered,
            daysBtwWatering,
            notes,
        });

        const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const body = JSON.stringify(newPlant);
            console.log(body)
			await axios.post("addplant", body, config);
			setFormData({
				name: "",
				lastWatered: today,
				daysBtwWatering: 1,
				notes: "",
			})
            // .then(res => console.log(res));
			// window.location.reload();
		} catch (err) {
			console.error("error", err);
		}
	};
    

return (
    <div className='form'>
        <section className='new-plant'>
            <h3>Please, add information about your plant.</h3>
            <form onSubmit={(e)=>onSubmit(e)}>
            <label htmlFor="name">Plant's name:</label>
            <input type="text" id="name" name="name" required
            minLength="2" maxLength="20" size="12" autoComplete="off" 
            value={name} onChange={(e)=> onChange(e)}/>

            <label htmlFor="lastWatered">Last watered:</label>
            <input type="date" id="lastWatered" name="lastWatered" required
            value={lastWatered} onChange={(e)=> onChange(e)}/>

            <label htmlFor="daysBtwWatering">Days between watering:</label>
            <input type="number" id="daysBtwWatering" name="daysBtwWatering"
                min="1" max="60" autoComplete="off" required 
                value={daysBtwWatering} onChange={(e)=> onChange(e)}/>

            <label htmlFor="notes">Notes:</label>
            <input type="text" id="notes" name="notes" placeholder='Does not like a direct sunlight' required
            value={notes} onChange={(e)=> onChange(e)}/>

            <button className='submit-btn' type='submit'>Add Plant</button> 
            </form>
        </section>

    </div>
)
}

export default NewPlant;