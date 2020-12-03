import React from 'react';
import {Field, ErrorMessage} from "formik";


const Select=(props)=> {
    const {label, name, options, friend, ...restProps} = props;
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <Field as='select' id={name} name={name}{...restProps} >
                {
                    options.map(opt=> {
                        return(<option  value={opt.value} key={opt.value}>{opt.key}</option>  )
                        })
                }
            </Field>

        </div>
    );
};

export default Select;
//<ErrorMessage name={name} component={TextError}/>