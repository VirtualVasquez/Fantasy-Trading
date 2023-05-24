import React, { useEffect } from 'react';
import './navbar.scss';

function logoutUser(){
    localStorage.removeItem('fantasy_access_token');
    window.location.reload();
}

const Navbar = props => {
    
    const handleLogout = (event) => {
         event.preventDefault();
         logoutUser();
    }

    useEffect(() => {
        // Get the navbar-toggler button element
        const navbarToggler = document.querySelector('.navbar-toggler');
        // Get the menu items container element
        const menuContainer = document.querySelector('.navbar-collapse');
    
        // Define the event listener function
        const toggleMenuContainer = () => {
            // Toggle the "collapse" class on the menu items container
            menuContainer.classList.toggle('show');
        };
    
        // Attach the click event listener to the navbar-toggler button
        navbarToggler.addEventListener('click', toggleMenuContainer);
    
        // Clean up the event listener when the component unmounts or the effect runs again
        return () => {
            navbarToggler.removeEventListener('click', toggleMenuContainer);
        };
    }, []);


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">

                <a className="navbar-brand" href="/">Stonks</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">
                                My Assets
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/trade">
                                Trade
                            </a>
                        </li>
                        <li className="nav-item">
                            <a 
                                className="nav-link" 
                                href="/"
                                onClick={handleLogout}
                            >
                                Log out
                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    )
}

export default Navbar;
