import React from 'react';

async function loginUser(email, password){
    try {
        const response = await axios.post('users/login', {
            email: email,
            password: password
        });

        //somewhere in the response should be an accesstoken we can store. 
        localStorage.setItem('fantasy_access_token', response.data.accessToken) // MAY NEED TO CHANGE
        //redirect might need to happen at the app level, but should occur once accessToken is achieved and stored in local storage.
        window.location.replace('/chat');
    } catch (error) {
        console.error(error)
    }
}

const LoginForm = props => {
    const [providedEmail, setEmail] = useState(null);
    const [providedPassword, setPassword] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        loginUser(email, password);
    }


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