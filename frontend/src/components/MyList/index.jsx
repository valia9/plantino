import React, {useState, useEffect} from 'react';
import './style.css';

import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroller';

import Plant from '../Plant';

const MyList = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        async function fetchData() {
        // You can await here
        await axios.get('mylist').then(response => {
            console.log(response.data)
            setList(response.data)
            }).catch(err => {
                console.log(err);
        })}
        fetchData();
            },
            []
	);

return (
    <div className='form'>
        {/* <h3>List of My Plants</h3> */}
        {list.map(plant => <Plant 
        name={plant.name}
        lastWatered={plant.lastWatered}
        daysBtwWatering={plant.daysBtwWatering}
        notes={plant.notes}
        key={plant._id}
        // setAnimal={setAnimal}
        />)}
    </div>
)
}

export default MyList;