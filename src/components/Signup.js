import React, { useState } from "react";

import UserPool from "../UserPool";

const Signup = () => {
  console.log("Signup page is on!");
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

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <h2>Sign Up</h2>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default Signup;
