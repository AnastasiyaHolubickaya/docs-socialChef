import React from 'react';
import Input from "./Input";
import Select from "./Select";
//import Textarea from "./Textarea";
//import Select from "./Select";
//import RadioButton from "./RadioButton";
//import Checkbox from "./Checkbox";
//import DatePicker from "./DatePicker";
//import ChakraInput from "./ChakraInput";
//import ChakraInput from "./ChakraInput";

const FormikControl=(props)=> {
    const {control, ...restProps} = props;
    switch (control) {
        case 'input':
           return <Input {...restProps}/>;
        case 'select':
            return <Select {...restProps}/>;
            default: return  null
    }
};
export default FormikControl;
