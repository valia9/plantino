import React, {useState} from 'react';
import './style.css';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import axios from 'axios';

const NewPlant = () => {

    let navigate = useNavigate();

    // specifying 'today' for future reference

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
    // console.log(notes)

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        toast.success(`Successfully added ${name}`, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 7000
          });
          
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
			setFormData({
				name: "",
				lastWatered: today,
				daysBtwWatering: 1,
				notes: "",
			})
			const body = JSON.stringify(newPlant);
			await axios.post("/addplant", body, config);
            navigate('/mylist')
		} catch (err) {
            toast.error("Seems like you already have a plant with this name. Please, use a different one!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 7000
              });
			console.error("error", err);
		}
	};
    

return (
        <section className='form--section'>
            <h3>Please, add information about your plant.</h3>
            <form onSubmit={(e)=>onSubmit(e)}>
            <label htmlFor='name'>Plant's name
            <small>May include letters and numbers</small>
            </label>
            <input type='text' id='name' name='name' required
            minLength='2' maxLength='20' size='12' autoComplete='off' 
            placeholder='Dracaena' pattern="[A-z0-9À-ž ]+"
            value={name} onChange={(e)=> onChange(e)}/>

            <label htmlFor='lastWatered'>Last watered</label>
            <input type='date' id='lastWatered' name='lastWatered' required
            value={lastWatered} onChange={(e)=> onChange(e)}/>

            <label htmlFor='daysBtwWatering'>Days between watering</label>
            <input type='number' id='daysBtwWatering' name='daysBtwWatering'
                min='1' max='60' autoComplete='off' pattern="[0-9]+" required 
                value={daysBtwWatering} onChange={(e)=> onChange(e)}/>

            <label htmlFor='notes'>Notes</label>
            <small>Non-mandatory</small>
            <textarea name="notes" id="notes" cols="30" rows="5"
            placeholder='Does not like direct sunlight' maxLength='180'
            pattern="[A-z0-9À-ž\s ]"
            onChange={(e)=> onChange(e)}></textarea>

            <button className='submit-btn' type='submit'>Add Plant</button> 
            </form>
        </section>
)
}

export default NewPlant;