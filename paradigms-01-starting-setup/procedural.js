const form = document.getElementById('user-input');

function signupHandler(event) {
    event.preventDefault();
    const userNameInput = document.getElementById('username');
    const enteredUsername = userNameInput.value;

    const passwordInput = document.getElementById('password');
    const eneteredPassword = passwordInput.value;

    if(enteredUsername.trim().length === 0) {
        alert('Invalid input - username must not be empty!');
        return;
    }

    if(eneteredPassword.trim().length <= 6) {
        alert('Invalid input - password must be 6 characters ot longer.');
        return;
    }

    const user = {
        userName: enteredUsername, 
        password: eneteredPassword,
    };

    console.log(user);
}

form.addEventListener('submit', signupHandler);