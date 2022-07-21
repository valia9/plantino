import React, {useState, useEffect} from 'react';
import './style.css';

import axios from 'axios';

import Plant from '../Plant';

const MyList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
        await axios.get('mylist').then(response => {
            console.log(response.data)
            setList(response.data)
            }).catch(err => {
                console.log(err);
        })}
        fetchData();}, []
    )

return (
    <div className='form'>
        <section className='my-list'>
            {/* <h3>List of My Plants</h3> */}
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
    </div>
)
}

export default MyList;