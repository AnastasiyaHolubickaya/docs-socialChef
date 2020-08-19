export const  requiredField = value => {
    if (value) return undefined;
    return "Поле обязательно к заполнению";
};

export const  maxLengthCreator = (maxLength) => (value) => {
    if (value.length > maxLength) return `максимальная длина ${maxLength} символов `;
    return undefined;
};

