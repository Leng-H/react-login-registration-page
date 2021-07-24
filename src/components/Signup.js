import React, { useState } from "react";

import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory("/login");

  const [formStage, setFormStage] = useState(1); // 1 for Signup Form Stage, 2 for Verfication Code Form Stage
  const [email, setEmail] = useState("");
  const [verficationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const userData = {
    Username: email,
    Pool: UserPool,
  };
  const cognitoUser = new CognitoUser(userData);

  // /**
  //  * Handling password change
  //  * @param {*} event
  //  */
  // const handlePasswordChange = (event) => {
  //   event.preventDefault();

  //   /**
  //    * Check Password Policy
  //    */
  //   let targetValue = event.target.value.replace(/\s/g, "");
  //   state.password = targetValue;

  //   // Check password length
  //   state.passwordLength = targetValue.length >= 8 ? true : false;

  //   // Check for number
  //   var hasNum = password.match(/\d+/g);
  //   state.containNum = hasNum != null ? true : false;

  //   // Check for special character
  //   var hasSymbol = new RegExp(/[^A-Z a-z0-9]/); // Characters we're not checking for
  //   state.containSpecialChar = hasSymbol.test(password);

  //   // Check for uppercase letters
  //   var hasUppercase = password.match(/[A-Z]/);
  //   state.containUppercase = hasUppercase != null ? true : false;

  //   // Check for lowercase letters
  //   var hasLowercase = password.match(/[a-z]/);
  //   state.containLowercase = hasLowercase != null ? true : false;
  // };

  /**
   * Handling the onClick event after the Sign Up button is clicked
   *
   * @param {*} event
   */
  const onSignupHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords are mismatched. Please try agian.");
      return;
    }

    // Create new user object
    try {
      UserPool.signUp(email, password, [], null, (err, data) => {
        if (err) {
          console.error(err);
          alert("Please follow the password policy and try agian");
          setFormStage(1);
        } else {
          alert("Success. Please verify your email.");
          setFormStage(2); // Start the Verfication Code Form Stage
        }

        console.log(data);
      });
    } catch (e) {
      if (e.name === "UsernameExistsException") {
        alert("User is already registered");
      } else {
        alert(e.message);
      }
    }
  };

  const onVerifyCodeHandler = (event) => {
    event.preventDefault();

    /**
     * Confirm user using the verfication code
     */
    cognitoUser.confirmRegistration(verficationCode, true, (err, result) => {
      if (err) {
        alert(err);
        return;
      } else {
        alert("Email confirmed");
        history.push("/login");
      }
      console.log("call result: " + result);
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
  // const checkPolicyStatus = () => {
  //   alert("Calculating Password Policy! Look at the console");
  //   console.log(
  //     "Length: " +
  //       state.passwordLength +
  //       "\nContain Num: " +
  //       state.containNum +
  //       "\nContain Special Char: " +
  //       state.containSpecialChar +
  //       "\nContain Uppercase: " +
  //       state.containUppercase +
  //       "\nContain Lowercase: " +
  //       state.containLowercase
  //   );
  // };

  return (
    <div className="center">
      <h2>Sign Up</h2>

      {/* The Sign Up Page */}
      {formStage === 1 && (
        <form onSubmit={onSignupHandler}>
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
              onChange={(event) => setPassword(event.target.value)}
            />
            <span></span>
            <label>Password</label>
          </div>
          <br />

          <div className="txt_field">
            <input
              type="password"
              value={confirmPassword}
              required
              placeholder=""
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            <span></span>
            <label>Confirm Password</label>
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
          {/* <button onClick={checkPolicyStatus} className="spacing">
            DEBUG: Password Policy Status
          </button> */}

          <div className="spacing">Already have an account? {login_}</div>

          <button type="submit" className="login_btn">
            SignUp
          </button>
        </form>
      )}

      {/* The Verfication Code Page */}
      {formStage === 2 && (
        <form onSubmit={onVerifyCodeHandler}>
          <div className="txt_field">
            <input
              maxLength="6"
              type="text"
              value={verficationCode}
              onChange={(event) => setVerificationCode(event.target.value)}
            />
            <span></span>
            <label>Verfication Code</label>
            <br />
          </div>
          <button type="submit" className="login_btn">
            Verify User
          </button>
        </form>
      )}
    </div>
  );
};

export default Signup;
