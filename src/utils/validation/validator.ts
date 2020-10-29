
 export type validatorType= (value:string)=> string|undefined



export const  requiredField:validatorType = (value) => {
    if (value) return undefined;
    return "Поле обязательно к заполнению";
};

export const  maxLengthCreator = (maxLength:number):validatorType => (value) => {
    if (value.length > maxLength) return `максимальная длина ${maxLength} символов `;
    return undefined;
};

