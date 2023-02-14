import React, { useEffect } from 'react';

const Navbar = props => {

    //state logic
    //at route '/'
        //if user is not signed in
            //Sign-up button only in nav - will be modal
                //login form will be a part of the homepage
        //if user is logged in
            //show nav links and logout button
            //on mobile view, show collapsible menu.
        

    //comment out useEffect until you know how to struct navbar buttons/links
    // useEffect(() => {
    //     // Get the navbar-toggler button element
    //     const navbarToggler = document.querySelector('.navbar-toggler');
    //     // Get the menu items container element
    //     const menuContainer = document.querySelector('.navbar-collapse');

    //     // Attach a click event listener to the navbar-toggler button
    //     navbarToggler.addEventListener('click', () => {
    //         // Toggle the "show" class on the menu items container
    //         menuContainer.classList.toggle('collapse');
    //     });
    // }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <a className="navbar-brand" href="#">Stonks</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Stonks </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                    </ul>
                </div>

                {/* Commenting out nav-buttons until I figure out more the logic for it to render */}

                {/* <div className="nav-buttons">
                    <button className="btn btn-light">
                        Login
                    </button>
                    <button className="btn btn-primary">
                        Sign up
                    </button>
                    <button className="btn btn-danger">
                        Log out
                    </button>
                </div> */}

            </div>
        </nav>
    )
}

export default Navbar;
