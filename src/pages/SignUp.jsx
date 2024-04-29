
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
import { IoLockClosed } from 'react-icons/io5';
import SignupSvg from '../assets/Sign up-bro.svg';
import '../styles/SignIn.css';
import { auth, db } from '../Firebase'; // Import Firebase auth and db
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { collection, addDoc} from 'firebase/firestore';

const SignUp = () => {
  const navigate = useNavigate();
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
        // Sign up the user directly using createUserWithEmailAndPassword
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);

        // Set up profileData object
        const profileData = {
          userId: userCredential.user.uid,
          email: values.email,
          role: 'regular',
        };

        // Add user data to Firestore
        const userRef = await addDoc(collection(db, 'users'), profileData);

        console.log("Document written with ID:", userRef.id);
        
        // Navigate to the next page after successful sign-up
        navigate('/displaypicture');
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

