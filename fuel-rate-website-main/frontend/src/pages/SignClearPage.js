import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../css/formpage.css';

// displays this page after successfully creating a new account
// prompts the user to log in with a link to the login page


function SignClear() {

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Sign up Successful!</h2>
                <br /><br />
                <br /><br />
                <p>Want to log in?</p>
                <Link className="other-form-button" to="/login">Log In</Link>
            </div>
        </div>
    );
}

export default SignClear;