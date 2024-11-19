import React, {useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import useStateContext from './hooks/useStateContext.js';
import {TopHeader,BottomFooter} from './components/Layout.js';
import WebRoutes from './components/WebRoutes.js';

// the main app component
// contains the entire website

function App() {
    const {context,setContext} = useStateContext();
    const [loggedin, setLoggedin] = useState(context.login_id);

    return (
        <BrowserRouter>
            <TopHeader login={loggedin} />
            <main>
                <WebRoutes />
            </main>
            <BottomFooter />
        </BrowserRouter>
    )
}

export default App;