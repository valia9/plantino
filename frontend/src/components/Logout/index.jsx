import React from 'react';
import './style.css';
import Auth from '../SignIn/Auth';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const Logout = () => {

    let navigate = useNavigate();

    // Logout functionality

    const onLogoutSubmit = async (e) => {
        e.preventDefault();
        console.log('logout click')
        toast.success("Success logging out !", {
          autoClose: 7000
        });

        try {
        let res = await axios.post("/logout");
          console.log(res);
          Auth.deauthenticateUser(res.data.token);
          navigate('/');
          window.location.reload();
          } catch (err) {
          console.error("error", err);
          }
      }

return (
        <form 
        className={`${Auth.isUserAuthenticated() ? 'logout' : 'logout invisible'}`}
        onSubmit={(e)=>onLogoutSubmit(e)}>
            <button
            className='submit-btn'
            type='submit'>
                Logout
            </button> 
        </form>
)
}

export default Logout;