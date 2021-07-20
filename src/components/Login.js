import React, { useState } from "react";

import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        alert("Registered Successfully");
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

        <div className="link">Forgot Password?</div>

        <button type="submit" className="login_btn">
          Login
        </button>

        {/* Add link to the Signup page */}
        <Link to="/signup">Sign Up</Link>
      </form>
    </div>
  );
};

export default Login;
