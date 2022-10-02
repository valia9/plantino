import React from 'react';
import './style.css';

const Error = () => {

    const user = localStorage.getItem("token");
return (
        <div className={user ? 'form--section' : 'form--login'}>
            <h2>
                Sorry! The page you are trying to reach does not exist
            </h2>
        </div>
)
}

export default Error;