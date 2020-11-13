import React from "react";
import classes from "./FormControls.module.css"
import  {Field,WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";
import { validatorType } from "../../../utils/validation/validator";


type formPropsType={
    meta: WrappedFieldMetaProps
}

const FormControl:React.FC<formPropsType> = ({children, meta:{touched,error}}) =>{
    const showError = touched && error;//meta.touched - сидят данные быь ли тронут инпут, meta.error- сидит вид ошибки
    return (
        <div className={showError ? classes.error: undefined}>
            {children}<br/>
            { showError && <span className={classes.spanError}>{error}</span>}
        </div>
    )
};

export  const Textarea:React.FC<WrappedFieldProps> = (props) => {//rest-оператор (достаем из пропсов input и meta остальное деструктуризируем
    //const{input ,meta, child,...restprops}   = props;
    const{input ,meta,...restprops}   = props;
    return <FormControl {...props}> <textarea {...input} {...restprops}  className={classes.textareaAddMess}/></FormControl>
};

export  const Input:React.FC<WrappedFieldProps> = (props) => {//rest-оператор (достаем из пропсов input и meta остальное деструктуризируем
    const{input ,meta,...restprops}   = props;
    return <FormControl {...props}> <input {...input} {...restprops}  className={classes.input}/></FormControl>

};
export  type getStringKeys<T> = Extract<keyof T, string>
//собственная функция-шаблон для отрисовки полей формы
export function CreateField<formKeysType extends string>(placeholder: string|undefined,
                                                         name:formKeysType,
                                                         validators: Array<validatorType>,
                                                         component: React.FC<WrappedFieldProps>,
                                                         props={}, text="") {
    return <div>
        <Field placeholder={placeholder} name={name} validate={validators} component={component} {...props}/> {text}

    </div>

}

/*export  const Textarea = ({input ,meta ,...props}) => {//rest-оператор (достаем из пропсов input и meta остальное деструктуризируем

    const showError = meta.touched && meta.error;//meta.touched - сидят данные быь ли тронут инпут, meta.error- сидит вид ошибки
    return (
        <div className={showError && classes.error}>
            <textarea {...input} {...props}  className={classes.textareaAddMess}/> <br/>
            { showError && <span className={classes.spanError}>{meta.error}</span>}
        </div>
    )
};

 export  const Input = ({input ,meta ,...props}) => {//rest-оператор (достаем из пропсов input и meta остальное деструктуризируем

    const showError = meta.touched && meta.error;//meta.touched - сидят данные быь ли тронут инпут, meta.error- сидит вид ошибки
    return (
        <div className={showError && classes.error}>
            <input {...input} {...props}  className={classes.input}/> <br/>
            { showError && <span className={classes.spanError}>{meta.error}</span>}
        </div>
    )
};*/