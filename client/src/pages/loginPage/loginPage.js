import React, {useEffect, useState } from 'react';
import stonks from '../../images/stonks.jpg';
import './loginPage.scss';
// import axios from 'axios';

const LoginPage = props => {
    return (
        <div className='container login-page'>
            <div className='row'>
                <div className='col-6 info-col'>
                <h1>Stonks Exchange</h1>
                <p>Whether you lack the money or the experience, the Stonks Exchange will help you learn the ropes. We're a platform that lets you practice trading real stocks with fake money.</p>
                    <img src={stonks} alt="stonks" width="100%"></img>
                </div>
                <div className='col-4 offset-2 form-col'>
                <form id="login-form">
                    <div class="form-group email-group">
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"></input>

                    </div>
                    <div class="form-group password-group">
                        <input type="password" class="form-control" id="password" placeholder="Password"></input>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary btn-submit">Log In</button>
                    </div>
                    <p class="button-divider"></p>
                    <button type="submit" class="btn btn-success btn-register">Create new Account</button>
                    </form>
                </div>     
            </div>

        </div>
    )
}

export default LoginPage;