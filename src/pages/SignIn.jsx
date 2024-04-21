import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { PiLockKeyThin } from "react-icons/pi";
import SigninSvg from '../assets/13245914_5186395.svg';
import '../styles/SignIn.css';
import { useAuth } from '../contexts/AuthContext';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
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
  
    //    try {
    //   const userCredential = await login(values.email, values.password, values.role);
    //   if (userCredential) {
    //     if (userCredential.role === 'admin') {
    //       navigate('/adminDashboard');
    //     } else {
    //       navigate('/userDashboard');
    //     }
    //   } else {
    //     setError('Login failed. Please check your information and try again.');
    //   }
    // } catch (error) {
    //   console.error('Error during login:', error);
    //   setError('Login failed. Please check your information and try again.');
    // }

     try {
        // Sign up the user
        await login(values.email, values.password);
        
        // Log in the user to get the role
        // const { role } = await login(values.email, values.password);
        
        // Redirect based on the role
        if (values.email === 'admin@gmail.com') {
          navigate('/adminDashboard');
        } else {
          navigate('/userDashboard');
        }
      } catch (error) {
        console.error('Error during signup:', error);
        setError('Sign up failed. Please try again.');
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
            <form onSubmit={formik.handleSubmit}>
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
              <button type="submit" className="LoginButton">
                SignIn
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
