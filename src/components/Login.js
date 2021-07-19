import React, { useState } from "react";

import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../UserPool";

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
      },
      onFailure: (err) => {
        console.log("onFailure:", err);
      },
      newPasswordRequired: (data) => {
        console.log("newPasswordRequired:", data);
      },
    });
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
