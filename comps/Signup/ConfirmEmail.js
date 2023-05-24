import { Formik } from "formik";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { sendEmailVerification } from "firebase/auth";

import { cfg } from '../../utils/firebaseConfig';

import { getFirestore } from "firebase/firestore";


const ConfirmEmail = (props) => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const notify = (category, message) => {
    if (category === "info") {
      toast.info(message);
    }
    if (category === "warn") {
      toast.warn(message);
    }
    if (category === "success") {
      toast.success(message);
    }
    if (category === "error") {
      toast.error(message);
    }
  };

  const emailVerificationTrigger = async () => {
    const auth = props.auth
    await sendEmailVerification(auth.currentUser);
  }

  const checkFirebaseEmailVerified = async () => {
    setIsLoading(true);
    
    // Initialize Firebase
    const appRefreshed = initializeApp(cfg);
    const db = getFirestore(appRefreshed);
    const auth = getAuth();
  
  
    const user = auth.currentUser;
    
    if (user) {
      await user.reload(); // Refresh the user object
      const isEmailVerified = user.emailVerified;
      
      console.log(isEmailVerified);
      
      if (isEmailVerified) {
        // User's email is verified
        setVerified(true);
        setIsLoading(false);
      } else {
        // User's email is not verified
        setVerified(false);
        setIsLoading(false);
      }
    }
  };
  
  
  

 


  useEffect(() => {
    emailVerificationTrigger();
  }, []);

// ------- THIS WAS CAUSING SAFARI TO NOT LOAD THE WEBSITE -------
  // useEffect(() => {
  //   const obscureEmail = (val) => {
  //      return val.replace(/(?<=.).(?=.*@)/g, "*");
  //   }
  //   setEmail(obscureEmail(email));
  // }, []);

  return (
    <>
    <ToastContainer />
    <div className="px-4 animate__animated animate__fadeInUp animate__faster">
      <div>
        <h1 className="font-black leading-tight text-[2.8rem] mb-5">Confirm your email address</h1>
        {/* <p className="font-light">
          We have sent an email to <span className="font-medium">{ email }</span> for you to verify.
        We have sent you an email with a One Time Pin (OTP) to { email }, please enter it below.
        </p> */}
      </div>


      {verified && (
          <button
          className="btn btn-gradient mt-10 block mx-auto w-[240px]"
          onClick={() => props.nextStep()}
          >
            Verified, continue
          </button>
          )
        }

        {!verified && (
          <>
          <p className="font-light">Please click the link in the verification email that was sent to <span className="font-medium">{email}</span>.</p>
          { isLoading && <Loader /> }
          <button className="btn bg-grey-light text mt-10 block mx-auto text-white" onClick={() => checkFirebaseEmailVerified()}>Check my status...</button>

          <div className="flex flex-row justify-center mt-10">
            <span onClick={() => props.reset()} className="text-sm text-purple cursor-pointer hover:underline">I want to start over</span>
          </div>
          </>
        )}

    </div>
    </>
  );
}

export default ConfirmEmail;
