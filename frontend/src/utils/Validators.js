export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!value) {
        return "Email is required";
    }

    if(!emailRegex.test(value)) {
        return "Please enter a valid Email"
    }
    return "";
}


export const isValidName = (value) => {
    if (/\d/.test(value)) return "Numbers are not allowed";
    if(!value) return "Field is Required";
    if(value.length < 4) return "the Content must be at least 4 characters";
    return "";
}