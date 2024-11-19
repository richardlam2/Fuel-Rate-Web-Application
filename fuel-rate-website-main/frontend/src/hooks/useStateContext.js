import React, { useEffect, createContext, useContext, useState } from 'react';

//hook for storing login info across entire website

export const stateContext = createContext();

//add login to session storage so it is saved while website is open in browser
const getFreshContext = () => {
    if (sessionStorage.getItem('context') === null) {
        sessionStorage.setItem('context',JSON.stringify({login_id: 0, username: ""}));
    }
    return JSON.parse(sessionStorage.getItem('context'));
}

//get this hook for using the context
function useStateContext() {
    const {context, setContext} = useContext(stateContext);
    return {context, setContext: obj => { setContext({...context,...obj})}};
}

//component to surround website to give access to state context
function ContextProvider({children}) {
    const [context,setContext] = useState(getFreshContext());

    useEffect(() => {
        sessionStorage.setItem('context', JSON.stringify(context));
    },[context]);
    
    return (
        <stateContext.Provider value={{context, setContext}}>
            {children}
        </stateContext.Provider>
    );
}

export {ContextProvider};
export default useStateContext;