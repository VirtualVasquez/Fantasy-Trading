import React, {useState} from 'react';
import axios from "axios";

async function createUser(email, password, passcheck) {
    try {
      const response = await axios.post('http://localhost:3001/users', {
        email: email,
        password: password,
        password_check: passcheck
      });
      localStorage.setItem("fantasy_access_token", response.data.accessToken);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
}

function validateCredentials(email, password, confirmPassword){
    if (!email) {
      return {status: false, msg:'Please provide a email' };
    }
    if (email.includes(' ')) {
      return {status: false, msg:'No whitespace is allowed for the email' };
    }
    if (!password) {
      return {status: false, msg: 'Please provide a password'};
    }
    if (password.includes(' ')) {
        return {status: false, msg: 'No whitespace is allowed for the password' };
      }
    if (password && !confirmPassword) {
        return {status: false, msg: 'Please confirm your password'};
      }

    if (password !== confirmPassword) {
      return {status: false, msg:'The passwords do not match' };
    }
    return {status: true, msg: 'valid' };
}

const RegisterForm = props => {
    const [providedEmail, setEmail] = useState(null);
    const [providedPassword, setPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();
        const validation = validateCredentials(
          providedEmail,
          providedPassword,
          passwordCheck
        );
        if(validation.status){
          createUser(providedEmail, providedPassword, passwordCheck);
        } 
        else {
            console.log(validation.msg);
        }
    };    


    return(
        <form id="register-form" className="account-form">
            <div className="form-group email-group">
                <input 
                    type="email" 
                    className="form-control" 
                    id="register-email" 
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
                    id="register-password" 
                    placeholder="Password"
                    onChange={e=>setPassword(e.target.value)}
                >
                </input>
            </div>
            <div className="form-group confirm-password-group">
                <input 
                    type="confirm-password" 
                    className="form-control" 
                    id="confirm-password" 
                    placeholder="Confirm password"
                    onChange={e=>setPasswordCheck(e.target.value)}    
                >
                </input>
            </div>
            <div>
                <button 
                    type="submit" 
                    className="btn btn-warning btn-submit"
                    onClick={handleSubmit}
                >
                    Log In
                </button>
            </div>
            <p className="button-divider"></p>
            <p className="to-login">Already have an account? <span onClick={props.toLogin}>Login Here</span></p>
        </form>
    )
}

export default RegisterForm;