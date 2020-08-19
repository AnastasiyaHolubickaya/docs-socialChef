import React from "react";
import classes from "./FormControls.module.css"

const FormControl = ({child, input ,meta ,...props}) =>{
    const showError = meta.touched && meta.error;//meta.touched - сидят данные быь ли тронут инпут, meta.error- сидит вид ошибки
    return (
        <div className={showError && classes.error}>
            {props.children}<br/>
            { showError && <span className={classes.spanError}>{meta.error}</span>}
        </div>
    )
};

export  const Textarea = (props) => {//rest-оператор (достаем из пропсов input и meta остальное деструктуризируем
      const{input ,meta, child,...restprops}   = props;
    return <FormControl {...props}> <textarea {...input} {...restprops}  className={classes.textareaAddMess}/></FormControl>
};

export  const Input = (props) => {//rest-оператор (достаем из пропсов input и meta остальное деструктуризируем
    const{input ,meta, child,...restprops}   = props;
    return <FormControl {...props}> <input {...input} {...restprops}  className={classes.input}/></FormControl>

};


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