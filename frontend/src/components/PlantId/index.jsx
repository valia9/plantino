import React from 'react';
import './style.css';


const PlantId = () => {

    return (
    <div className='form'>
        <section className="plant-id">
            <p className='plant-id--text'>Sometimes we remove labels of our newly adopted plants too soon. 
                This may leave us wondering: what is even this thing I brought home? 
                Here you can deal with such a misfortune.</p>
            <div className="input-wrapper">
            <label className='input-label' htmlFor="myImage">Upload a photo</label>
                <input
                type='file'
                className='input-image'
                name='myImage'
                onChange={(event) => {
                console.log(event.target.files[0]);
                //   setSelectedImage(event.target.files[0]);
                }}
                accept=".jpg, .jpeg, .png"
                capture='environment'
                required
                />
            </div>
                <button className='submit-btn'>Submit</button>
        </section>
    </div>

    )

}

export default PlantId;