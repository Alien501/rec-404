import React, { useState } from "react";

import { Link } from "react-router-dom";

import './NavBar.css';

export default function NavBar() {
    const [onHome, setOnHome] = useState(true);

    function onNavClick(isHome) {
        if((isHome && !onHome) || (!isHome && onHome)) {
            setOnHome(prev => !prev)
        }
    }

    return(
        <div className="navbar-container">
            <div className="nav-button-container lilita-one-regular">
                <Link to="/" className={`nav-link-container ${onHome? 'active':''}`} onClick={() => onNavClick(true)}>
                    Home
                </Link>
                <Link to="/profile" className={`nav-link-container ${!onHome? 'active':''}`} onClick={() => onNavClick(false)}>
                    Profile
                </Link>
            </div>
        </div>
    )
}