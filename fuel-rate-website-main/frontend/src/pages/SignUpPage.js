import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import useForm from '../hooks/useForm.js';
import useStateContext from '../hooks/useStateContext.js';
import '../css/formpage.css';
import { endpointConnection, ENDPOINTS } from '../api/index.js';

// sign up page

// creates blank object with form values for useForm hook
const getFreshModel = () => ({
    username: "",
    password: ""
});

function Signup() {
    const {context, setContext} = useStateContext();
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const navigate = useNavigate();

    // when form submits, try to create new account
    // include validation and endpoint connection here
    const signup = (e) => {
        e.preventDefault();
        // connect to backend if form fields are valid
        if (validate()) {
            // connect to the signup api in the backend
            endpointConnection(ENDPOINTS.signup)
            .post(values)
            .then(res => {
                console.log(res.data);
                // redirect to sign clear page
                navigate('/login');
                alert("New account created!");
            })
            .catch(error => {
                console.log(error);
                try {
                    alert(error.response.data);
                }
                catch (err) {
                    alert(error.message);
                }
            })
        }
    };

    const validate = () => {
        // set error messages in temp object, will display on page if there is an error
        let temp ={};
        temp.username = values.username != "" ? "" : "You must enter a username.";
        temp.password = values.password != "" ? "" : "You must enter a password.";
        setErrors(temp);
        // checks that all error messages are blank and returns true if so
        return Object.values(temp).every(x => x == "");
    };

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Sign Up</h2>
                <hr style={{border:'2px solid black'}}/>
                <div className='form-inner-box'>
                    <form name="signupForm" method="post" id="signupForm" onSubmit={signup}> 
                        <label>Username: </label><br />
                        <input type="text" name="username" value={values.username} onChange={handleInputChange} size="30" maxLength="100" required/><br />
                        <p>{errors.username}</p><br />
                        <label>Password: </label><br />
                        <input type="password" name="password" value={values.password} onChange={handleInputChange} size="30" maxLength="100" required/><br />
                        <p>{errors.password}</p><br />
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="signupForm">Create New Account</button>
                <br /><br />
                <p>Already have an account?</p>
                <Link className="other-form-button" to="/login">Log In</Link>
            </div>
        </div>
    );
}

export default Signup;