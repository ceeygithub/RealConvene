import React, { useState } from 'react';
import PasswordReset from '../assets/20602818_6325245.svg';
import { useAuth } from "../contexts/AuthContext";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email, newPassword);
      setResetSuccess(true);
    } catch (error) {
      console.error('Error resetting password:', error);
      setResetSuccess(false);
    }
  };

  return (
    <>
      {resetSuccess ? (
        <p>Password reset successful! You can now login with your new password.</p>
      ) : (
        <div className="LoginPageContainer">
          <div className="LoginPageInnerContainer">
            <div className="ImageContianer">
              <img src={PasswordReset} className="GroupImage" alt="GroupImage"/>
            </div>
            <div className="LoginFormContainer">
              <div className="LoginFormInnerContainer">
                <header className="header">Log in</header>
                <header className="subHeader">
                  <h1>Reset Password</h1>
                </header>

                <form onSubmit={handleSubmit}>
                  <div className="inputContainer">
                    <label className="label" htmlFor="emailAddress">
                      <img src="https://i.imgur.com/Hn13wvm.png" className="labelIcon" alt="Email Icon" />
                      <span>Email Address*</span>
                    </label>
                    <input
                      type="email"
                      className="input"
                      id="emailAddress"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="inputContainer">
                    <label className="label" htmlFor="password">
                      <img src="https://i.imgur.com/g5SvdfG.png" className="labelIcon" alt="Password Icon" />
                      <span>New Password*</span>
                    </label>
                    <input
                      className="input"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="inputContainer">
                    <label className="label" htmlFor="password">
                      <img src="https://i.imgur.com/g5SvdfG.png" className="labelIcon" alt="Password Icon" />
                      <span>Confirm Password*</span>
                    </label>
                    <input
                      className="input"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="LoginButton">Reset Password</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
