import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { PiLockKeyThin } from "react-icons/pi";
import SignupSvg from '../assets/Sign up-bro.svg';
import '../styles/SignIn.css'

const SignUp = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
   const response = await fetch('http://localhost:3002/user/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(values),
});


        if (response.ok) {
          navigate('/profile');
        } else {
          console.error('Error during signup:', response.statusText);
          throw new Error('Response not OK');
        }
      } catch (error) {
        console.error('Error during user creation:', error);
        formik.setFieldError('submit', 'Registration failed. Please check your information and try again.');
      }
    },
  });

  return (
    <>
      <div className="LoginPageContainer">
        <div className="LoginPageInnerContainer">
          <div className="ImageContianer">
            <img src={SignupSvg} className="GroupImage" alt="GroupImage" />
          </div>
          <div className="LoginFormContainer">
            <div className="LoginFormInnerContainer">
              <div className="LogoContainer"></div>
          
              <header className="header">Welcome to <b>Convene!</b> <br/>Please Enter your Details</header>

              <form onSubmit={formik.handleSubmit}>
                <div className="inputContainer">
                  <label className="label" htmlFor="Username">
                    <CiUser className="labelIcon" alt="labelIcon" /><span>Username*</span>
                  </label>
                  <input
                    type="text"
                    className="input"
                    id="Username"
                    placeholder="Enter your Username"
                    {...formik.getFieldProps('username')}
                  />
                  {formik.touched.username && formik.errors.username && <div className="error-message">{formik.errors.username}</div>}
                </div>
                <div className="inputContainer">
                  <label className="label" htmlFor="emailAddress">
                    <CiMail className="labelIcon" alt="labelIcon" />
                    <span>Email Address*</span>
                  </label>
                  <input
                    type="email"
                    className="input"
                    id="emailAddress"
                    placeholder="Enter your Email Address"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
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
                    placeholder="Enter your Password"
                 
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password && <div className="error-message">{formik.errors.password}</div>}
                </div>

                <button className="LoginButton" type="submit" id='SignUP'>Create Account</button>

                {formik.errors.submit && <div className="error-message">{formik.errors.submit}</div>}
              </form>

              <Link to="/signin" className="SignInLink">
                Already have an account? <b> Sign In</b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
