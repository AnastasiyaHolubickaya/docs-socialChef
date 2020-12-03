import {Form, Formik } from "formik";
import React from "react";
import FormikControl from "../FormikControl";
import classes from './SearchFormik.module.css'
import {filterType} from "../../../redux/usersReducer";

const dropDownOptions=[
    {key:'', value:''},
    {key:'Всех', value:'undefined'},
    {key:'Только друзей', value:'true'},
    {key:'Только не друзей', value:'false'},
];

type propsType={
    search:(filter:filterType)=>void
}
const  initialValues = {
    name:'',
    friend:undefined
};
 type initialValuesType  = typeof initialValues;

const SearchFormik:React.FC<propsType> = ({search}) =>{

    const onSubmit = (values:filterType, onSubmitProps:any) => {
        console.log('Form data',values);
        search(values);
        onSubmitProps.resetForm()
    };

    return (
        <div className={classes.form}>
            <div> <h3>Поиск пользователей</h3></div>
        <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
        >
            {
                formik=><Form className={classes.form__formSearch}>
                            <FormikControl control='input' type='text' label='введите имя ' name='name'/>
                     <FormikControl control='select' options={dropDownOptions} label='фильтр' name='friend' />
                     <button className={classes.form__button} type='submit' disabled={formik.isSubmitting}>Поиск</button>
                </Form>
            }
        </Formik>
</div>

    )
};

export  default SearchFormik;
//конвертация значений values
//type formPropsType={
//     name: string
//     friend:'null'|'true'|'false'
// }
/*const newValues = {
            name: values.name,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        };*/