import React, {useState, useEffect} from 'react';
import './style.css';

import axios from 'axios';

import Plant from '../Plant';

const MyList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
        try {
            const resp = await axios.get('/api');
            // console.log(resp)
            // console.log(resp.data)
            setList(resp.data)

        } catch(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          }
        };
        fetchData();
    }, 
    [list]
)

return (
    <div>
        {list.length > 0 
        ? 
        <section className='form--section'>
            {list
            .map(plant => <Plant 
            name={plant.name}
            lastWatered={plant.lastWatered}
            daysBtwWatering={plant.daysBtwWatering}
            notes={plant.notes}
            key={plant._id}
            id={plant._id}
            />)}
        </section> 
        : 
        <section className='form--section'>
          <h3 className='plant-id--text'>Your plantlist is currently empty. <br/> To add the first plant, please, go to the tab "Add New Plant"</h3>
        </section>}
    </div>
)
}

export default MyList;