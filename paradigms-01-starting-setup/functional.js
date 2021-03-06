const REQUIRED = 'REQUIRED';
const MIN_LENGTH = 'MIN_LENGTH';

function validate(value, flag, validatorValue) {
    if (flag === REQUIRED) {
        return value.trim().length > 0;
      }
      if (flag === MIN_LENGTH) {
        return value.trim().length > validatorValue;
      }
}

function createUser(userName, userPassword){
    if(!validate(userName, REQUIRED) || !validate(userPassword, MIN_LENGTH, 5)){
        throw new Error('Invalid input!');
    }
    return {
        userName: userName,
        password: userPassword
    }
}

function getuserInput(inputElementId) {
    return document.getElementById(inputElementId).value;
}

function signupHandler(event) {
    event.preventDefault();
    
    const enteredUsername = getuserInput('username');
    const enteredPassword = getuserInput('password');
    
    try{
        const newUser = createUser(enteredUsername, enteredPassword);
        console.log(newUser);
    } catch(err) {
        alert(err.message);
    }
}

function connectForm(formId, formSubmitHandler) {
    const form = document.getElementById('user-input');
    form.addEventListener('submit', formSubmitHandler);
}

connectForm('user-input', signupHandler);