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
        fetchData();

        // const onLoad = () => {
        //     let lw = [];
        //     let dbw = [];
        // for (let i=0; i < list.length; i++) {
        //     lw.push(list[i].lastWatered);
        //     dbw.push(list[i].daysBtwWatering);
        // }
        // let nw = lw.map((a, b) => DateTime.fromISO(a).plus({ days: dbw[b] }).toFormat('dd.MM.yyyy'));
        // console.log(nw)
        // }
        // onLoad();
            },
            []
	);



return (
    <div className='form'>
        <section className='my-list'>
            {/* <h3>List of My Plants</h3> */}
            {list
            // .sort(function(a, b) {
            //     var c = new Date(a.date);
            //     var d = new Date(b.date);
            //     return c-d;
            // })
            .map(plant => <Plant 
            name={plant.name}
            lastWatered={plant.lastWatered}
            daysBtwWatering={plant.daysBtwWatering}
            notes={plant.notes}
            key={plant._id}
            id={plant._id}
            // setAnimal={setAnimal}
            />)}
        </section>
    </div>
)
}

export default MyList;