import React, { useState } from "react";

import UserPool from "../UserPool";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Create user
    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) console.error(err);
      console.log(data);
    });
  };

  // Link to the Login page
  var login_ = (
    <Link to="/login" className="link">
      Login
    </Link>
  );

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
            onChange={(event) => setPassword(event.target.value)}
          />
          <span></span>
          <label>Password</label>
        </div>
        <br />

        <div className="spacing">Already have an account? {login_}</div>

        <button type="submit" className="login_btn">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Signup;
