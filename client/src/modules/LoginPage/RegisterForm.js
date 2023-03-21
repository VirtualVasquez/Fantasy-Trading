import React from 'react';


const RegisterForm = props => {
    return(
        <form id="register-form" className="account-form">
            <div class="form-group email-group">
                <input type="email" class="form-control" id="register-email" aria-describedby="emailHelp" placeholder="Enter email"></input>
            </div>
            <div class="form-group password-group">
                <input type="password" class="form-control" id="register-password" placeholder="Password"></input>
            </div>
            <div class="form-group confirm-password-group">
                <input type="confirm-password" class="form-control" id="confirm-password" placeholder="Confirm password"></input>
            </div>
            <div>
                <button type="submit" class="btn btn-warning btn-submit">Log In</button>
            </div>
            <p className="button-divider"></p>
            <p className="to-login">Already have an account? <span onClick={props.toLogin}>Login Here</span></p>
        </form>
    )
}

export default RegisterForm;