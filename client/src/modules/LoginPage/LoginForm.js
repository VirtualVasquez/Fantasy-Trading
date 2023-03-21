import React from 'react';


const LoginForm = props => {
    return(
        <form id="login-form" className="account-form">
            <div class="form-group email-group">
                <input type="email" class="form-control" id="login-email" aria-describedby="emailHelp" placeholder="Enter email"></input>

            </div>
            <div class="form-group password-group">
                <input type="password" class="form-control" id="login-password" placeholder="Password"></input>
            </div>
            <div>
                <button type="submit" class="btn btn-primary btn-submit">Log In</button>
            </div>
            <p class="button-divider"></p>
            <button type="submit" class="btn btn-success btn-register" onClick={props.toRegister}>Create new Account</button>
        </form>
    )
}

export default LoginForm