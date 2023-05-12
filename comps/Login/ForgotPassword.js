import { useState } from "react";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { cfg } from '../../utils/firebaseConfig';
import { getFirestore } from "firebase/firestore";

const ForgotPassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);

  // Initialize Firebase
  const app = initializeApp(cfg);
  const db = getFirestore(app);
  const auth = getAuth();

  const handleFormSubmit = async (email) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      notify("success", "Password reset email sent!");
      setIsReset(true);
      setIsLoading(false);
    } catch (error) {
      notify("error", error.message);
      setIsLoading(false);
    }
  };

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

  return (
    <>
      <ToastContainer />

      {!isReset && (
      <Formik
            initialValues={{
              email: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await handleFormSubmit(values.email);
                setSubmitting(false);
                return;
              } catch (e) {
                console.log(e);
                console.log("FAILED!");
                return;
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-between"
              >
                <div>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="Email Address"
                    className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                  />
                  <div className="text-error-500">
                    {errors.email && touched.email && errors.email}
                  </div>

                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-gradient mt-10"
                >
                  Reset password
                </button>
                { isLoading && <Loader /> }
              </form>
            )}
      </Formik>
      )}

      {isReset && (
        <>
          <p className="text-slate-500 mt-5 text-center">Click on the link sent to your email and then go back to login.</p>
          <div className='btn btn-white mt-10' onClick={() => props.exit()}>
            <span>Back to login</span>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
