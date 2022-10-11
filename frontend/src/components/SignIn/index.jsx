import React, {useState } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import './style.css';
import Auth from './Auth';

import { toast } from 'react-toastify';
import axios from 'axios';

const SignIn = () => {

  let navigate = useNavigate();
  let location = useLocation();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const {username, password} = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }

    const onLoginSubmit = async (e) => {
        e.preventDefault();

        const user =({
            username,
            password,
        });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        };
        
        try {
          const body = JSON.stringify(user);       
          let res = await axios.post("/signin", body, config)
          Auth.authenticateUser(res.data.token)
          setFormData({
            username: '',
            password: '',
          })
          toast.success("Welcome back to Plantino!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 7000
          });
          navigate('/mylist')
          window.location.reload();

        setFormData({
          username: '',
          password: '',
        })
      } catch (err) {
        if (err) {
          toast.error("Wrong username or password. Please, try again.", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 7000
          });
        }
      console.error("error", err);
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
        ${(location.pathname === '/signin') ? 'span--arrow' : 'invisible'}`}
        onClick={handleClick}>
            <Link to="/" style={{color: 'black'}}>arrow_back_ios</Link>
        </span>
            <form 
            className='form--login__textbox'
            onSubmit={(e)=>onLoginSubmit(e)}>

                <label htmlFor='username'>Your username: <small>Demo username: demoUser1</small></label>
                <input type='text' id='username' name='username' required
                minLength='6' maxLength='20' size='12'  
                placeholder='JaneDoe86' onChange={(e)=> onChange(e)}
                value={username} pattern="^[a-zA-Z0-9-_\.]{6,20}$"
                />  

                <label htmlFor='password'>Password: <small>Demo password: demoUser1</small></label>
                <input type='password' id='password' name='password' required
                minLength='8' size='20' autoComplete='off'
                placeholder='********' onChange={(e)=> onChange(e)}
                />

                <button className='submit-btn' type='submit'>Login</button> 

            </form>

        </div>
    </div>
  );
}

export default SignIn;