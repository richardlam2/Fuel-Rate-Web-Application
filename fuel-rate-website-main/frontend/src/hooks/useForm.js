import {useState} from 'react';

//hook for handling form data

function useForm(getFreshModelObject) {
    const [values,setValues] = useState(getFreshModelObject());
    const [errors,setErrors] = useState({});

    //called when input field changes
    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setValues({...values, [name]: value});
    }

    return {values,setValues,errors,setErrors,handleInputChange};
}

export default useForm;