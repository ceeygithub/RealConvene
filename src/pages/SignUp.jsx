
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
import { IoLockClosed } from 'react-icons/io5';
import SignupSvg from '../assets/Sign up-bro.svg';
import '../styles/SignIn.css';
import { useAuth } from '../contexts/AuthContext';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
     const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await signup(values.email, values.password).then(
  navigate('/displaypicture')
        );
      
      } catch (error) {
        console.error('Error during signup:', error.message);
        // Handle error or set formik error message accordingly
      }
    },
  });
    const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="LoginPageContainer">
      <div className="LoginPageInnerContainer">
        <div className="ImageContianer">
          <img src={SignupSvg} className="GroupImage" alt="GroupImage" />
        </div>
        <div className="LoginFormContainer">
          <div className="LoginFormInnerContainer">
            <header className="header">Welcome to <b>Convene!</b> <br/>Please Enter your Details</header>

            <form onSubmit={formik.handleSubmit}>
              <div className="inputContainer">
                <label className="label" htmlFor="emailAddress">
                  {/* Use the imported icon components */}
                  <IoMdMail className="labelIcon" alt="labelIcon" />
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
                  {/* Use the imported icon components */}
                  <IoLockClosed className="labelIcon" alt="Password Icon" />
                  <span>Password*</span>
                </label>
                <input
  type={showPassword ? "text" : "password"}
  className="input"
  id="password"
  name="password"
  placeholder="Enter your Password"
  {...formik.getFieldProps('password')}
  required
/>
                 {showPassword ? (
                     <FaRegEye className="eyeicon" alt="Show Password Icon" onClick={togglePasswordVisibility} />
                  ) : (
                     <FaRegEyeSlash className="eyeicon" alt="Hide Password Icon" onClick={togglePasswordVisibility} />
                  )}
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
  );
};

export default SignUp;
