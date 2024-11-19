// if not found then inside frontend folder run 'npm install axios'
import axios from 'axios';

// connects the front end to the back end
// contains all API calls and the endpoint connection function

// backend server url
// would change to actual url if we were to host the website
export const BASE_URL = 'http://localhost:5000';

// list of all endpoint connection apis
export const ENDPOINTS = {
    login: '/login',
    signup: '/signup',
    fuelrate: '/fuelrate/getquote',
    savequote: '/fuelrate/savequote',
    quotehistory: '/quotehistory',
    profile: '/profile',
};

// call this function to connect to the back end
export const endpointConnection = (endpoint) => {
    let url = BASE_URL + endpoint;
    return {
        get: () => axios.get(url), // get request
        get: id => axios.get(url+'/'+id), // get request with id
        post: data => axios.post(url,data), // post request
        put: (id,data) => axios.put(url+'/'+id,data), // put request
        delete: id => axios.delete(url+'/'+id) // delete request
    };
};

/*
EXAMPLES:

POST request example
use POST when the request will add, remove, or edit anything in the database or send sensitive information (passwords)
this should be used when submitting forms


endpointConnection(ENDPOINTS.someApi)   // will connect using the someApi endpoint
.post(formData)            // submits the form data to the server
.then(res => {             // then function returns the response from the server and contains actions to do after the connection is successful
    let returnedData = res.data;   // response is inside response.data array
    // any actions when backend successfully responds
})
.catch(error => {       // catch function returns error from server and contains actions to do after the connection fails
    // any actions when backend returns an error
})
.finally(function () {      // OPTIONAL, always executes even if backend returns an error
    // any actions after connection whether it is successful or not
});


GET request example
use when you are only returning data from the database without changing anything

endpointConnection(ENDPOINTS.someApi)   // will connect using the someApi endpoint
.get(username)                    // sends the request to the server, include argument when looking for a specific user's information
.then(res => {
    let returnedData = response.data;   // response is inside response.data array
    // any actions when backend successfully responds
})
.catch(error => {       // catch function returns error from server and contains actions to do after the connection fails
    // any actions when backend returns an error
})
.finally(function () {      // OPTIONAL, always executes even if backend returns an error
    // any actions after connection whether it is successful or not
});


PUT request example
can use when you are modifying existing data in the database, such as updating a users profile

endpointConnection(ENDPOINTS.someApi)   // will connect using the someApi endpoint
.put(username,formData)            // submits the form data to the server along with the user to change
.then(res => {             // then function returns the response from the server and contains actions to do after the connection is successful
    let returnedData = response.data;   // response is inside response.data array
    // any actions when backend successfully responds
})
.catch(error => {       // catch function returns error from server and contains actions to do after the connection fails
    // any actions when backend returns an error
})
.finally(function () {      // OPTIONAL, always executes even if backend returns an error
    // any actions after connection whether it is successful or not
});

DELETE request example
only to be used when deleing data in the database, like a user deleting their profile

endpointConnection(ENDPOINTS.someApi)   // will connect using the someApi endpoint
.delete(username)                    // sends the request to the server, include argument when looking for a specific user's information
.then(res => {
    let returnedData = response.data;   // response is inside response.data array
    // any actions when backend successfully responds
})
.catch(error => {       // catch function returns error from server and contains actions to do after the connection fails
    // any actions when backend returns an error
})
.finally(function () {      // OPTIONAL, always executes even if backend returns an error
    // any actions after connection whether it is successful or not
});

*/