import React, { useState } from "react";

import UserPool from "../UserPool";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Password policy checker
   */
  let state = {
    password: "",
    passwordLength: true, // 8 minimum
    containNum: false,
    containSpecialChar: false,
    containUppercase: false,
    containLowercase: false,
  };

  /**
   * Handling password change
   * @param {*} event
   */
  const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);

    let targetValue = event.target.value.replace(/\s/g, "");
    state.password = targetValue;

    // Check password length
    state.passwordLength = targetValue.length >= 8 ? true : false;

    // Check for number
    var hasNum = password.match(/\d+/g);
    state.containNum = hasNum != null ? true : false;

    // Check for special character
    var hasSymbol = new RegExp(/[^A-Z a-z0-9]/); // Characters we're not checking for
    state.containSpecialChar = hasSymbol.test(password);

    // Check for uppercase letters
    var hasUppercase = password.match(/[A-Z]/);
    state.containUppercase = hasUppercase != null ? true : false;

    // Check for lowercase letters
    var hasLowercase = password.match(/[a-z]/);
    state.containLowercase = hasLowercase != null ? true : false;
  };

  /**
   * Handling the onClick event after the Sign Up button is clicked
   *
   * @param {*} event
   */
  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Create new user object
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        console.error(err);
        alert("Please follow the password policy and try agian");
      } else {
        alert("Success. Please verify your email.");
      }

      console.log(data);
    });
  };

  // Link to the Login page
  var login_ = (
    <Link to="/login" className="link">
      Login
    </Link>
  );

  /**
   * DEBUG
   */
  const checkPolicyStatus = () => {
    alert("Calculating Password Policy! Look at the console");
    console.log(
      "Length: " +
        state.passwordLength +
        "\nContain Num: " +
        state.containNum +
        "\nContain Special Char: " +
        state.containSpecialChar +
        "\nContain Uppercase: " +
        state.containUppercase +
        "\nContain Lowercase: " +
        state.containLowercase
    );
  };

  return (
    <div className="center">
      <h2>Sign Up</h2>
      <form onSubmit={onSubmitHandler}>
        <div className="txt_field">
          <input
            type="email"
            value={email}
            required
            placeholder=""
            onChange={(event) => setEmail(event.target.value)}
          />
          <span></span>
          <label>Email</label>
        </div>
        <br />

        <div className="txt_field">
          <input
            type="password"
            value={password}
            required
            placeholder=""
            onChange={handlePasswordChange}
          />
          <span></span>
          <label>Password</label>
        </div>
        <br />

        <div className="spacing">
          <div>
            <li className={state.passwordLength ? "green" : null}>
              At least 8 characters
            </li>
            <li className={state.containNum ? "green" : null}>
              Require numbers
            </li>
            <li className={state.containSpecialChar ? "green" : null}>
              Require special characters
            </li>
            <li className={state.containUppercase ? "green" : null}>
              Require uppercase letters
            </li>
            <li className={state.containLowercase ? "green" : null}>
              Require lowercase letters
            </li>
          </div>
        </div>

        {/* DEBUG */}
        <button onClick={checkPolicyStatus} className="spacing">
          DEBUG: Password Policy Status
        </button>

        <div className="spacing">Already have an account? {login_}</div>

        <button type="submit" className="login_btn">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
