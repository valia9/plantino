import React, {useEffect} from 'react';
import './style.css';

const Plant = () => {

    useEffect(() => {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth()+1; //January is 0!
      let yyyy = today.getFullYear();

      if(dd<10) {
          dd = '0'+dd
      } 

      if(mm<10) {
          mm = '0'+mm
      } 
      
      today = yyyy + '-' + mm + '-' + dd;
       document.getElementById('watered').value = today;
    });

return (
    <div className='form'>
         <a href="#" className="close">&times;</a>
        <h3>Please, add information about your plant.</h3>
        <label htmlFor="name">Plant's name:</label>
        <input type="text" id="name" name="name" required
           minLength="2" maxLength="20" size="12" autoComplete="off"/>

        <label htmlFor="watered">Last watered:</label>
        <input type="date" id="watered" name="watered" min="2022-06-01" required/>

        <label htmlFor="frequency">Days between watering:</label>
        <input type="number" id="frequency" name="frequency"
            min="1" max="60" autoComplete="off" required />

        <input className='input' type="submit" value="Add Plant" />

        <script>

        </script>
    </div>
)
}

export default Plant;