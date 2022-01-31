class Validator {
  static REQUIRED = "REQUIRED";
  static MIN_LENGTH = "MIN_LENGTH";

  static validate(value, flag, validatorValue) {
    if (flag === this.REQUIRED) {
      return value.trim().length > 0;
    }
    if (flag === this.MIN_LENGTH) {
      return value.trim().length > validatorValue;
    }
  }
}

class User {
    constructor(uName, uPassword) {
        this.userName = uName;
        this.password = uPassword;
    }

    greet() {
        console.log(this.userName, this.password);
    }
}

class UserInputForm {
  constructor() {
    this.form = document.getElementById("user-input");
    this.userNameInput = document.getElementById("username");
    this.password = document.getElementById("password");

    this.form.addEventListener("submit", this.signupHandler.bind(this));
  }

  signupHandler(event) {
    event.preventDefault();
    const enteredUsername = this.userNameInput.value;
    const enteredPassword = this.password.value;

    if (
      !Validator.validate(enteredUsername, Validator.REQUIRED) ||
      !Validator.validate(enteredPassword, Validator.MIN_LENGTH, 5)
    ) {
      alert("Invalid input!");
      return;
    }

    const newUser = new User(enteredUsername, enteredPassword);
    newUser.greet();
  }
}

const form = new UserInputForm();
