import React from 'react';
import '../css/layout.css';
import { Link } from 'react-router-dom';
import MapImg from '../images/map_background.jpg';
import Login from '../pages/LoginPage.js';
import Signup from '../pages/SignUpPage.js';

function Home() {
    return (
        <div className="home-background" style={{backgroundImage: "url("+MapImg+")"}}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'orange', padding: '10px', borderRadius: '5px', textAlign: 'center',fontFamily: 'Arial' }}>
                <p style={{ fontSize: '26px',  color: 'black' }}>Welcome to</p>
                <p style={{ fontSize: '29px', color: 'black' }}>Fuel Tracker</p>
                <p style={{ fontSize: '16px', color: 'black' }}>Vehicle management</p>
                <p style={{ fontSize: '16px', color: 'black' }}>Fuel log, costs and mileage tracking</p>
                <p style= {{color: 'black' }}><strong>Please <Link to="/Login">log in</Link> or <Link to="/SignUp">sign up</Link> to get started!</strong></p>
            </div>
        </div>
    );
}

export default Home;