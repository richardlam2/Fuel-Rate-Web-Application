import React, { useState, useEffect } from 'react';
import '../css/formpage.css';
import useForm from '../hooks/useForm.js';
import useStateContext from '../hooks/useStateContext.js';
import { ENDPOINTS, endpointConnection } from '../api/index.js';

// page that allows a user to calculate fuel rates

// Gallons Requested (numeric, requried)
// Delivery Address (Non-editable, comes from client profile)
// Delivery Date (Calender, date picker)
// Suggested Price / gallon (numeric non-editable)
// Total Amount Due (numeric non-editable, calculated (gallons * price))

const getFreshModel = () => ({
    userId: 0,
    gallonsRequested: 1,
    address1: "",
    address2: "",
    state: "",
    city: "",
    zipcode: "",
    deliveryDate: "",
});

function FuelRate() {
    const {context, setContext} = useStateContext();
    const {values,setValues,errors,setErrors,handleInputChange} = useForm(getFreshModel);
    const [suggestedPrice, setSuggestedPrice] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (context.login_id)
            getUserInfo();
    },[]);

    const getUserInfo = () => {
        endpointConnection(ENDPOINTS.profile)
        .get(context.login_id)
        .then(res => {
            setValues({...values,
                userId: context.login_id,
                address1: res.data.address1,
                address2: res.data.address2,
                city: res.data.city,
                state: res.data.state,
                zipcode: res.data.zipcode});
        })
        .catch(error => {
            console.log(error);
        })
    };


    const getFuelRate = (e) => {
        e.preventDefault();
        if (validate()) {
            endpointConnection(ENDPOINTS.fuelrate)
            .post(values)
            .then(res => {
                console.log(res.data);
                setSuggestedPrice(res.data.suggestedPrice);
                setTotalAmount(res.data.totalAmount);
                setReady(true);
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
        temp.gallonsRequested = values.gallonsRequested > 0 ? "" : "Value must be greater than 0.";
        temp.deliveryDate = new Date(values.deliveryDate) > new Date() ? "" : "Delivery date must be in the future.";
        temp.address = values.address1 != "" ? "" : "You must enter an address.";
        temp.city = values.city != "" ? "" : "You must enter a city.";
        temp.state = values.state != "" ? "" : "You must select a state.";
        temp.zipcode = values.zipcode != "" ? "" : "You must enter a zip code.";
        setErrors(temp);
        // checks that all error messages are blank and returns true if so
        return Object.values(temp).every(x => x == "");
    };

    const saveQuote = () => {
        const quoteData = {
            userId: values.userId,
            gallonsRequested: values.gallonsRequested,
            deliveryDate: values.deliveryDate,
            address: values.address1 + " " + values.address2 + " " + values.city + ", " + values.state + " " + values.zipcode,
            suggestedPrice: suggestedPrice,
            totalPrice: totalAmount
        };
        endpointConnection(ENDPOINTS.savequote)
        .post(quoteData)
        .then(res => {
            console.log(res.data);
            alert(res.data);
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
    };

    return (
        <div className='form-page'>
            <div className='form-box'>
                <h2>Calculate Your Fuel Rate</h2>
                <hr style={{border:'2px solid black'}}/>
                {context.login_id == 0 && <p>Please log in to calculate your fuel quotes.</p>}
                <div className='form-inner-box'>
                    <form name="fuelRateForm" method="post" id="fuelRateForm" onSubmit={getFuelRate}>
                        <label>Gallons Requested: </label><br />
                        <input type="number" min="1" class="form-control" id="gallonsRequested" onChange={handleInputChange} name="gallonsRequested" value={values.gallonsRequested} required></input>
                        <p>{errors.gallonsRequested}</p>
                        <label>Delivery Date</label>
                        <input type="date" class="form-control" id="deliveryDate" onChange={handleInputChange} name="deliveryDate" value={values.deliveryDate} required></input>
                        <p>{errors.deliveryDate}</p>
                        <label>Delivery Address 1</label><br />
                        <input type="text" class="form-control" id="address1" name="address1" value={values.address1} readOnly={context.login_id !== 0}></input>
                        <p>{errors.address1}</p>
                        <label>Address 2: </label><br />
                        <input type="text" class="form-control" id="address2" name="address2" value={values.address2} readOnly={context.login_id !== 0}></input>
                        <p>{errors.address2}</p>
                        <label>City: </label><br />
                        <input type="text" class="form-control" id="city" name="city" value={values.city} readOnly={context.login_id !== 0}></input>
                        <p>{errors.city}</p>
                        <label>State:</label>
                        <input type="text" class="form-control" id="state" name="state" value={values.state} readOnly={context.login_id !== 0}></input>
                        <p>{errors.state}</p>
                        <label>Zipcode: </label><br />
                        <input type="text" class="form-control" id="delivery_zipcode" name="delivery_zipcode" value={values.zipcode} readOnly={context.login_id !== 0}></input>
                        <p>{errors.zipcode}</p><br />
                    </form>
                </div>
                <button className="submit-button" type="submit" value="Submit" form="fuelRateForm">Get Fuel Quote</button>
                <br />
                {ready && <div>
                    <br />
                    <div className="form-inner-box">
                        <label>Suggested Price/Gallon: </label>
                        <input type="text" value={suggestedPrice} readonly></input><br />
                        <label>Total Amount Due: </label>
                        <input type="text" value={totalAmount} readonly></input><br /><br />
                    </div>
                    {context.login_id != 0 && <button className="submit-button" type="button" onClick={() => saveQuote()}>Submit Quote</button>}
                </div>}
            </div>
        </div>
    );

    
}

export default FuelRate;