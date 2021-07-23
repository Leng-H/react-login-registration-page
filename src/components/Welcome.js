import React from "react";

import { useHistory } from "react-router-dom";

const Welcome = () => {
  const history = useHistory("");

  const onSubmitHandler = () => {
    history.push("/");
  };

  return (
    <div className="center">
      <form onSubmit={onSubmitHandler}>
        <div>
          <h2>Welcome!</h2>
          <h3>You have successfully logged in</h3>
        </div>

        <button type="submit" className="login_btn">
          Logout
        </button>
      </form>
    </div>
  );
};

export default Welcome;
