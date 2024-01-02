import React, {useState} from 'react';
import axios from '../../helpers/axiosConfig';

async function createUser(email, password, passcheck) {
    try {
      const response = await axios.post('/users', {
        email: email,
        password: password,
        password_check: passcheck
      });
      localStorage.setItem("fantasy_access_token", response.data.accessToken);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        const status = error.response.status;
        if (status === 400) {
          throw new Error("Err Code: 400. Invalid request. Please provide valid email, password, and password check.");
        } else if (status === 401) {
          throw new Error("Err Code: 401 Unauthorized. Please check your credentials.");
        } else if (status === 500) {
          throw new Error("Err Code: 500. Internal server error. Please try again later.");
        } else {
          throw new Error("An error occurred while processing your request. Please try again.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error("No response received from the server. Please try again later.");
      } else {
        // Something else happened in making the request
        throw new Error("An error occurred while making the request. Please try again.");
      }
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
                    Create Account
                </button>
            </div>
            <p className="button-divider"></p>
            <p className="to-login">Already have an account? <span onClick={props.toLogin}>Login Here</span></p>
        </form>
    )
}

export default RegisterForm;