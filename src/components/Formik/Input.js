import React from 'react';
import {Field} from "formik";


const Input=(props)=> {
    const {label, name, ...restProps} = props;
    return (
        <div >
            <label htmlFor={name}>{label}</label>
            <Field id={name} name={name}{...restProps} />
        </div>
    );
};

export default Input;