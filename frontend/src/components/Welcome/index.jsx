import React, {useState} from 'react';
import './style.css';
import { Outlet, Link, useLocation } from "react-router-dom";

const Welcome = () => {

    const location = useLocation();

    const [isSignInActive, setSignInActive] = useState(false);
    const [isSignUpActive, setSignUpActive] = useState(false);

    const handleSignInClick = (event) => {
        event.stopPropagation();
        setSignInActive(!isSignInActive);
        setSignUpActive(false);
        event.preventDefault();
    }

    const handleSignUpClick = (event) => {
        event.stopPropagation();
        setSignUpActive(!isSignUpActive);
        setSignInActive(false);
        event.preventDefault();
    }

  return (
    <div className='container--welcome'>
        <div className='form--welcome'>
        <section className={location.pathname === '/' ? null : 'invisible'}>
            <div className='text--welcome'>
                <h2>Wecome to Plantino.</h2>
                <h3>Plantino is a web application that tracks the watering schedule of your houseplants.</h3>
                <h3>To proceed with Plantino, you will need an account. Please, create it or use the exisiting one to log in.</h3>
                <h3>Having an account is neccessary for the user to access their plants list from any device.</h3>
            </div>
                <div className='login-btns'>
                            <button
                            className='app--button'  
                            onClick={handleSignUpClick}>
                            <Link to="/signup" style={{color: 'white'}}>Sign Up</Link>
                            </button>
                            
                            <button
                            className='app--button'  
                            onClick={handleSignInClick}
                            >
                            <Link to="/signin" style={{color: 'black'}}>Sign In</Link>
                            </button>
                </div>
        </section>
            <Outlet />
        </div>
    </div>
  );
}

export default Welcome;