import {Routes,Route} from "react-router-dom";
import Home from '../pages/HomePage.js';
import FuelRate from '../pages/FuelRatePage.js';
import QuoteHistory from '../pages/QuoteHistoryPage.js';
import Login from '../pages/LoginPage.js';
import Signup from '../pages/SignUpPage.js';
import SignClear from '../pages/SignClearPage.js';
import Profile from '../pages/ProfilePage.js';
import Logout from '../pages/LogoutPage.js';

// contains all the page links for the website
// whenever adding a new page, import the component here and add a Route for it
function WebRoutes() {
    return (
        <Routes>
            <Route index path='/' element={<Home />}></Route>
            <Route path='/fuel-rate' element={<FuelRate />}></Route>
            <Route path='/quote-history' element={<QuoteHistory />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/logout' element={<Logout />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path='/signclear' element={<SignClear />}></Route>
        </Routes>
    );
}

export default WebRoutes;