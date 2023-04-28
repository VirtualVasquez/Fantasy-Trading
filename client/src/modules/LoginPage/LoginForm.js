import React, {useState} from 'react';
import axios from "axios";

async function LoginUser(email, password){
    try {
        const response = await axios.post('users/login', {
            email: email,
            password: password
        });

        localStorage.setItem('fantasy_access_token', response.data.accessToken); 
        window.location.reload();
    } catch (error) {
        console.error(error)
    }
}

const LoginForm = props => {
    const [providedEmail, setEmail] = useState(null);
    const [providedPassword, setPassword] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        LoginUser(providedEmail, providedPassword);
    }


    return(
        <form id="login-form" className="account-form">
            <div className="form-group email-group">
                <input 
                    type="email" 
                    className="form-control" 
                    id="login-email" 
                    aria-describedby="emailHelp" 
                    placeholder="Enter email"
                    onChange={e=>setEmail(e.target.value)}
                    >
                </input>

            </div>
            <div className="form-group password-group">
                <input 
                    type="password"
                    className="form-control" 
                    id="login-password" 
                    placeholder="Password"
                    onChange={e=>setPassword(e.target.value)}
                >
                </input>
            </div>
            <div>
                <button 
                    type="submit" 
                    className="btn btn-primary btn-submit"
                    onClick={handleSubmit}
                >
                    Log In
                </button>
            </div>
            <p className="button-divider"></p>
            <button 
                type="submit" 
                className="btn btn-success btn-register" 
                onClick={props.toRegister}
            >
                Create new Account
            </button>
        </form>
    )
}

export default LoginForm