import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import {ContextProvider} from './hooks/useStateContext.js';

// base javascript file that gets called when React starts
// stores the entire app inside the ContextProvider hook that stores login info

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <App />
    </ContextProvider>
);
