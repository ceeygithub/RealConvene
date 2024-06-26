

import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword directly
import { useNavigate, Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { PiLockKeyThin } from "react-icons/pi";
import SigninSvg from '../assets/13245914_5186395.svg';
import '../styles/SignIn.css';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { auth } from '../Firebase'; // Import auth from Firebase


const SignIn = () => {
  const navigate = useNavigate();
  // const { login, user } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

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
      setIsLoading(true);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password); // Call signInWithEmailAndPassword directly
        
        // Redirect based on the role
        if (userCredential.user.email === 'admin@gmail.com') {
          navigate('/adminDashboard');
        } else if(userCredential.user){
          navigate('/userDashboard');
        }else{
                  setError('Sign in failed. Please check details.');
        }
      } catch (error) {
        console.error('Error during sign-in:', error);
        setError('Sign in failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleReset = () => {
    navigate('/ResetPassword');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
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
            <form onSubmit={(e) => formik.handleSubmit(e)}>
              <div className="inputContainer">
                <label htmlFor="email">
                  <CiUser className="labelIcon" alt="labelIcon" /><span>Email*</span>
                </label>
                <input
                  type="email"
                  className="input"
                  id="email"
                  placeholder="Enter your Email"
                  {...formik.getFieldProps('email')}
                  required
                />
                {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
              </div>
              <div className="inputContainer">
                <label htmlFor="password">
                  <PiLockKeyThin className="labelIcon" alt="Password Icon" />
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
              {error && <div className="error-message">{error}</div>}
              <div className="OptionsContainer">
                <div className="checkboxContainer">
                  <input type="checkbox" id="RememberMe" className="checkbox" />
                  <label htmlFor="RememberMe">Remember me</label>
                </div>
                <Link to="/ResetPassword" className="SignInLink" onClick={handleReset}>
                  Forgot Password?
                </Link>
              </div>
              <button type="submit" className="LoginButton" disabled={isLoading}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
