import React, {useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { endpointConnection, ENDPOINTS } from '../api/index.js';
import useForm from '../hooks/useForm.js';
import useStateContext from '../hooks/useStateContext.js';
import '../css/formpage.css';

// the users profile page
// let them view and change their info
// set up function when it submits
const getFreshModel = () => ({
    userId: 0,
    name: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: ""
});

// make sure to add a normal view that displays the profile info
/* suggestion for choosing to display the the form to edit profile info:
    -maybe create useState hook of boolean value that determines whether to show the change profile form or not
    -an edit profile button switches the state to true, submitting the form sets it to false
    -have 2 different components for the normal page and the form, switch which one to display depending on the state
    -you can pass all the user information to each component by passing it as an object to the components props
*/

/* for the backend calls:
-have the GET call that retreives the users info when they load the page in a useEffect hook
    -include the username as a parameter in the GET request ex: endpointConnection(ENDPOINTS.quoteHistory+"/"+username)
    -you can get the username from the useStateContext hook
-have the POST call that submits the form to change the user's info in the function that the form calls
*/

function Profile() {
    const {context, setContext} = useStateContext();
    const [userInfo, setUserInfo] = useState(getFreshModel);
    const [editProfile, setEditProfile] = useState(false);
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    
    useEffect(() => {
        setValues({...values, userId: context.login_id});
        getUserInfo();
    },[]);

    const edit = () => {
        setEditProfile(true);
        
    };

    const validate = () => {
        // set error messages in temp object, will display on page if there is an error
        let temp ={};
        temp.name = values.name !== "" ? "" : "You must enter a name.";
        temp.address = values.address1 !== "" ? "" : "You must enter an address.";
        temp.city = values.city !== "" ? "" : "You must enter a city.";
        temp.state = values.state !== "" ? "" : "You must select a state.";
        temp.zipcode = values.zipcode !== "" ? "" : "You must enter a zip code.";
        setErrors(temp);
        // checks that all error messages are blank and returns true if so
        console.log(temp)
        return Object.values(temp).every(x => x === "");
    };
    
    const getUserInfo = () => {
        endpointConnection(ENDPOINTS.profile)
        .get(context.login_id)
        .then(res => {
            console.log(res.data);
            if (Object.keys(res.data).length === 0) {
                console.log("New user");
                setEditProfile(true);
            }
            else {
                setUserInfo(res.data);
            }
        })
        .catch(error => {
            console.log(error);
        })
    };

    const changeUserInfo = (e) => {
        e.preventDefault();
        if (validate()) {
            endpointConnection(ENDPOINTS.profile)
            .post(values)
            .then(res => {
                console.log(res.data);
                alert(res.data);
                setUserInfo(values);
                setEditProfile(false);
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
    
    if (editProfile) {
        return (
            <div className='form-page'>
                <div className='form-box'>
                    <h2>Profile</h2>
                    <p>{context.username}</p>
                    <hr style={{border:'2px solid black'}}/>
                    <div className='form-inner-box'>
                        <form name="profileForm" method="post" id="profileForm" onSubmit={changeUserInfo}>
                            <label>Full Name: </label><br />
                            <input type="text" name="name" id="name" value={values.name} onChange={handleInputChange} maxLength="50" required/><br />
                            <p>{errors.name}</p><br />
                            <label>Address 1: </label><br />
                            <input type="text" name="address1" id="address1" value={values.address1} onChange={handleInputChange} maxLength="100" required/><br />
                            <p>{errors.address}</p><br />
                            <label>Address 2: </label><br />
                            <input type="text" name="address2" id="address2" value={values.address2} onChange={handleInputChange} maxLength="100"/><br />
                            <label>City: </label><br />
                            <input type="text" name="city" id="city" value={values.city} onChange={handleInputChange} maxLength="100" required/><br />
                            <p>{errors.city}</p><br />
                            <label>State :  </label><br />
                            <select id="state" name = "state" value={values.state} onChange={handleInputChange} required>
                                <option value = "" disabled> Select State </option>
                                <option value = "AL" > Alabama </option>
                                <option value = "AK" > Alaska </option>
                                <option value = "AZ" > Arizona </option>
                                <option value = "AR" > Arkansas </option>
                                <option value = "CA" > California </option>
                                <option value = "CO" > Colorado </option>
                                <option value = "CT" > Connecticut </option>
                                <option value = "DE" > Delaware </option>
                                <option value = "FL" > Florida </option>
                                <option value = "GA" > Georgia </option>
                                <option value = "HI" > Hawaii </option>
                                <option value = "ID" > Idaho </option>
                                <option value = "IL" > Illinois </option>
                                <option value = "IN" > Indiana </option>
                                <option value = "IA" > Iowa </option>
                                <option value = "KS" > Kansas </option>
                                <option value = "KY" > Kentucky </option>
                                <option value = "LA" > Louisiana </option>
                                <option value = "ME" > Maine </option>
                                <option value = "MD" > Maryland </option>
                                <option value = "MA" > Massachusetts </option>
                                <option value = "MI" > Michigan </option>
                                <option value = "MN" > Minnesota </option>
                                <option value = "MS" > Mississippi </option>
                                <option value = "MO" > Missouri </option>
                                <option value = "MT" > Montana </option>
                                <option value = "NE" > Nebraska </option>
                                <option value = "NV" > Nevada </option>
                                <option value = "NH" > New Hampshire </option>
                                <option value = "NJ" > New Jersey </option>
                                <option value = "NY" > New York </option>
                                <option value = "NC" > North Carolina </option>
                                <option value = "ND" > North Dakota </option>
                                <option value = "OH" > Ohio </option>
                                <option value = "OK" > Oklahoma </option>
                                <option value = "OR" > Oregon </option>
                                <option value = "PA" > Pennsylvania </option>
                                <option value = "RI" > Rhode Island </option>
                                <option value = "SC" > South Carolina </option>
                                <option value = "SD" > South Dakota </option>
                                <option value = "TN" > Tennessee </option>
                                <option value = "TX" > Texas </option>
                                <option value = "UT" > Utah </option>
                                <option value = "VT" > Vermont </option>
                                <option value = "VA" > Virginia </option>
                                <option value = "WA" > Washington </option>
                                <option value = "WV" > West Virginia </option>
                                <option value = "WI" > Wisconsin </option>
                                <option value = "WY" > Wyoming </option>
                            </select> <br /><br />
                            <label>Zipcode: </label><br />
                            <input type="text" name="zipcode" id="zipcode" value={values.zipcode} onChange={handleInputChange} maxLength="9" minLength="5" required/><br />
                            <p>{errors.username}</p><br />
                        </form>
                    </div>
                    <button className="submit-button" type="submit" value="Submit" form="profileForm">Save Changes</button>
                    <br /><br />
                    <button className="submit-button" type="button" onClick={() => setEditProfile(false)}>Discard Changes</button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className='form-page'>
                <div className='form-box'>
                    <h2>Profile</h2>
                    <p>{context.username}</p>
                    <hr style={{border:'2px solid black'}}/>
                    <div className='form-inner-box'>
                        <p>Full Name: {userInfo.name}</p>
                        <p>Address 1: {userInfo.address1}</p>
                        <p>Address 2: {userInfo.address2}</p>
                        <p>City: {userInfo.city}</p>
                        <p>State: {userInfo.state}</p>
                        <p>Zip Code: {userInfo.zipcode}</p>
                    </div>
                    <button className='submit-button' type='button' onClick={() => edit()}>Edit Profile</button>
                </div>
            </div>
        );
    }
}

export default Profile;