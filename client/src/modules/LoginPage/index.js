import React, { useState } from 'react';
import stonks from '../../images/stonks.jpg';
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import './loginPage.scss';

function LoginPage () {

    const[ showLogin, setShowLogin]  = useState(true);

    const toggleLogin = (e) => {
        e.preventDefault();
        if(showLogin){
            setShowLogin(false);
        } else {
            setShowLogin(true);
        }
    }

    return (
        <div className='container login-page'>
            <div className='row'>
                <div className='col-10 offset-1 col-lg-6 offset-lg-0 info-col'>
                <h1>Stonks Exchange</h1>
                <p>Whether you lack the money or the experience, the Stonks Exchange will help you learn the ropes. We're a platform that lets you practice trading real stocks with fake money.</p>
                    <img src={stonks} alt="stonks" width="100%"></img>
                </div>
                <div className='col-10 offset-1 col-lg-4 offset-lg-2  form-col'>
                    {
                        showLogin ? 
                        <LoginForm 
                            toRegister={toggleLogin}                       
                        /> 
                        : 
                        <RegisterForm 
                            toLogin={toggleLogin}
                        />
                    }
                </div>     
            </div>

        </div>
    )
}

export default LoginPage;