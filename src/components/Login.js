import React, { useState } from "react";

import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"; // Need to be installed manually; npm install react-router-dom
import UserPool from "../UserPool";
import Signup from "./Signup";

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
    <Router>
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

          {/* TODO */}
          <Link to="/signup">Sign Up</Link>

          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>

          {/* <Link to="/signup">Sign Up</Link>
          <Route path={`{match.path}/:signup`}>
            <Signup />
          </Route> */}
        </form>
      </div>
    </Router>
  );
};

export default Login;
