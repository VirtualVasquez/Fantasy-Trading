import React, { useEffect } from 'react';

const Navbar = props => {

    useEffect(() => {
        // Get the navbar-toggler button element
        const navbarToggler = document.querySelector('.navbar-toggler');
        // Get the menu items container element
        const menuContainer = document.querySelector('.navbar-collapse');

        // Attach a click event listener to the navbar-toggler button
        navbarToggler.addEventListener('click', () => {
            // Toggle the "show" class on the menu items container
            menuContainer.classList.toggle('collapse');
        });
    }, []);

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
            </div>
        </nav>
    )
}

export default Navbar;
