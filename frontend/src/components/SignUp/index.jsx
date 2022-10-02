import React, {useState} from 'react';
import './style.css';

import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';

import axios from 'axios';

const SignUp = () => {

      let navigate = useNavigate();
      let location = useLocation();

      const [formData, setFormData] = useState({
        username: '',
        email: '',
        passsword: ''
    })

    const {username, email, password} = formData;


    const onChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
      e.preventDefault();
      const newUser =({
          username,
          email,
          password,
      });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      };

      
      try {
        const body = JSON.stringify(newUser);
        await axios.post("/signup", body, config);
        setFormData({
          username: '',
          email: '',
          password: '',
      })
          // console.log(body)
        toast.success("Welcome to Plantino! Now you can log in.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 7000
        });
        navigate('/signin')
        window.location.reload();
    } catch (err) {
    console.error("error", err);
    toast.error("Seems like we already have a user with this username or email. Please, try to log in!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 7000
    });
    }
    };

    const handleClick = () => {
      navigate('/')
    } 

  return (
        <div>
        <div className='form--login form--login--mobile'>
        <span 
        className={`material-symbols-outlined
        ${(location.pathname === '/signup') ? 'span--arrow' : 'invisible'}`}
        onClick={handleClick}>
            <Link to="/" style={{color: 'black'}}>arrow_back_ios</Link>
        </span>
            <form className='form--login__textbox' onSubmit={(e)=>onSubmit(e)}>

                <label htmlFor='username'>Your username: <small>6-20 characters, no spaces</small></label>
                <input type='text' id='username' name='username' required
                minLength='6' maxLength='20' size='12'  
                placeholder='JaneDoe86' value={username} pattern="^[a-zA-Z][a-zA-Z0-9-_\.]{2,20}$"
                onChange={(e)=> onChange(e)}
                />  

                <label htmlFor='email'>Your e-mail:</label>
                <input type='text' id='email' name='email' required
                placeholder='example@example.com' value={email}
                onChange={(e)=> onChange(e)}
                />

                <label htmlFor='password'>Password: <small>Minimum 8 characters. <br/> At least one uppercase letter,<br />one lowercase and a number.</small></label>
                <input type='password' id='password' name='password' required
                minLength='8' size='20' 
                placeholder='********' value={password} 
                // pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$"
                onChange={(e)=> onChange(e)}
                />
                <button className='submit-btn' type='submit'>Sign Up</button> 
            </form>
        </div>
        </div>
  );
}

export default SignUp;