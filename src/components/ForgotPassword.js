import React, { useState } from "react";

import { CognitoUser } from "amazon-cognito-identity-js";
import { useHistory } from "react-router-dom";
import UserPool from "../UserPool";

const ForgotPassword = () => {
  const history = useHistory("/login");

  const [formStage, setFormStage] = useState(1); // 1 for Email Form Stage, 2 for New Password Form Stage
  const [email, setEmail] = useState("");
  const [verficationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLowerCase(),
      Pool: UserPool,
    });
  };

  const sendVerficationCode = (event) => {
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: (data) => {
        // Successfully initiated reset password request
        console.log("onSucess: ", data);
      },
      OnFailure: (err) => {
        console.log("onFailure: ", err);
      },
      inputVerificationCode: (data) => {
        console.log("Input Code: ", data);
        setFormStage(2); // Start the New Password Form Stage
      },
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("Passwords are mismatched");
      console.error("Passwords are mismatched");
      return;
    }

    getUser().confirmPassword(verficationCode, newPassword, {
      onSuccess: (data) => {
        alert("You've successfully changed your password");
        console.log("onSucess: ", data);
        history.push("/login");
      },
      OnFailure: (err) => {
        alert(err);
        console.error("onFailure: ", err);
      },
    });
  };

  return (
    <div className="center">
      <h2>Forgot Password</h2>

      {formStage === 1 && (
        <form onSubmit={sendVerficationCode}>
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
          <button type="submit" className="login_btn">
            Send Verfication Code
          </button>
        </form>
      )}

      {formStage === 2 && (
        <form onSubmit={resetPassword}>
          <div className="txt_field">
            <input
              value={verficationCode}
              onChange={(event) => setVerificationCode(event.target.value)}
            />
            <span></span>
            <label>Verfication Code</label>
          </div>
          <br />

          <div className="txt_field">
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
            <span></span>
            <label>New Password</label>
          </div>
          <br />

          <div className="txt_field">
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
            <span></span>
            <label>Confirm Password</label>
          </div>
          <br />

          <button type="submit" className="login_btn">
            Change Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
