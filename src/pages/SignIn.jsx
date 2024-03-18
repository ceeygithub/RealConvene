import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { PiLockKeyThin } from "react-icons/pi";
import SigninSvg from '../assets/13245914_5186395.svg';
import '../styles/SignIn.css';
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        
        await login(values.username, values.password);
        // If login is successful, navigate to userDashboard
        navigate('/userDashboard');
      } catch (error) {
        console.error('Error during login:', error);
        formik.setFieldError('submit', 'Login failed. Please check your information and try again.');
      }
    },
  });

  const handleReset = () => {
    navigate('/ResetPassword');
  };

  return (
    <>
      <div className="LoginPageContainer">
        <div className="LoginPageInnerContainer">
          <div className="ImageContianer">
            <img src={SigninSvg} className="GroupImage" alt="GroupImage" />
          </div>
          <div className="LoginFormContainer">
            <div className="LoginFormInnerContainer">
              <header className="header">
                Hi, Welcome back to <b>Convene!</b> <br/> Please Enter your Details
              </header>
              <form onSubmit={formik.handleSubmit}>
                <div className="inputContainer">
                  <label className="label" htmlFor="username">
                    <CiUser className="labelIcon" alt="labelIcon" /><span>Username*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    id="username"
                    placeholder="Enter your Username"
                    {...formik.getFieldProps('username')}
                    required
                  />
                  {formik.touched.username && formik.errors.username && <div className="error-message">{formik.errors.username}</div>}
                </div>
                <div className="inputContainer">
                  <label className="label" htmlFor="password">
                    <PiLockKeyThin className="labelIcon" alt="Password Icon" />
                    <span>Password*</span>
                  </label>
                  <input
                    type="password"
                    className="input"
                    id="password"
                    name="password"
                    placeholder="Enter your Password"
                    {...formik.getFieldProps('password')}
                    required
                  />
                  {formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
                </div>
                <div className="OptionsContainer">
                  <div className="checkboxContainer">
                    <input type="checkbox" id="RememberMe" className="checkbox" />
                    <label htmlFor="RememberMe">Remember me</label>
                  </div>
                  <Link to="/ResetPassword" className="SignInLink" onClick={handleReset}>
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className="LoginButton">
                  SignIn
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
