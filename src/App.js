import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Welcome from "./components/Welcome";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Make Login as the default landing page */}
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/welcome" exact component={Welcome} />
          <Route path="/forgot_password" exact component={ForgotPassword} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
