import React, { useState } from "react";

import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory("/welcome");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Create user
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    // Authenticate user
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
        alert("Login Successfully");
        history.push("/welcome");
      },
      onFailure: (err) => {
        console.log("onFailure:", err);
        alert("Something is not right");
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired:", data);
      },
    });
  };

  // Link to the Signup page
  var signup_ = (
    <Link to="/signup" className="link">
      Sign up
    </Link>
  );

  // Link to the Forgot Password page
  var forgotPassword_ = (
    <Link to="/forgot_password" className="link">
      Forgot Password?
    </Link>
  );

  return (
    <div className="center">
      <h2>Login</h2>

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
            onChange={(event) => setPassword(event.target.value)}
          />
          <span></span>
          <label>Password</label>
        </div>
        <br />

        <div className="spacing">
          {forgotPassword_} | Are you new? {signup_}
        </div>

        <button type="submit" className="login_btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
