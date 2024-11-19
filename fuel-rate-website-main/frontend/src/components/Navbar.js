import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import '../css/navbar.css';
import useStateContext from '../hooks/useStateContext.js';

//navigation bar at top of screen

//navigation bar container
function Navbar(props) {
    const {context, setContext} = useStateContext();
    const [account, setAccount] = useState(context.account);
    
    // have NavButton for each page link in the navbar
    // maybe set quote history button to only be visible when logged in?
    return (
        <div id='navbox'>
            <ul id='navbar'>
                <NavButton link="/" text="Home" align="left"/>
                <NavButton link="/fuel-rate" text="Fuel Rate Calculator" align="left"/>
                <NavButton link="/quote-history" text="Fuel Quote History" align="left"/>
                <ProfNavButton login={props.login} />
                <LogNavButton login={props.login} />
            </ul>
        </div>
    );
}

//navigation button
function NavButton(props) {
    // set whether button floats right or left
    const align = {float: props.align};
    return (
        <li style={align}>
            <NavLink className='navbutton' to={props.link}>{props.text}</NavLink>
        </li>
    );
}

//log in or log out button
function LogNavButton(props) {
    const [loggedin, setLoggedin] = useState(props.login);
    if (loggedin) {
        return <NavButton link="/logout" text="Log Out" align="right" />;
    } else {
        return <NavButton link="/login" text="Log In" align="right"/>;
    }
}

//sign up or profile button
function ProfNavButton(props) {
    const [loggedin, setLoggedin] = useState(props.login);
    if (loggedin) {
        return <NavButton link="/profile" text="Profile" align="right"/>;
    } else {
        return <NavButton link="/signup" text="Sign Up" align="right"/>;
    }
}

export default Navbar;