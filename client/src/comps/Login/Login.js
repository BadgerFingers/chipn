import React, { useState, useEffect } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Formik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const Login = (props) => {
  const [step, setStep] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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

  const loginHandler = async(email, password) => {
    const auth = getAuth();
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setIsLoading(false)
        notify("success", "Login successful")
        const user = userCredential.user;
        console.log(user)
        props.success();
        // ...
      })
      .catch((error) => {
        setIsLoading(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        notify("error", errorMessage)
        return
      });
  }

  useEffect(() => {
    if (props.active) {
      setStep(1); // 6
    }
  }, [props.active]);

  return (
    <>
    <ToastContainer />
    <div className="animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-full md:w-7/12 lg:w-5/12 max-w-[400px] h-[85%] top-[15%] left-0 right-0 mx-auto">
      <div
        className={
          props.active
            ? "transition-all duration-300 flex flex-row justify-between relative -top-20 px-5"
            : "transition-all duration-300 flex flex-row justify-between relative top-20 px-5"
        }
      >
        <div
          className="flex flex-row items-center text-white"
          onClick={() => {
            props.closeLogin();
            setStep(1);
          }}
        >
          <FaAngleLeft className="text-xl" /> <span>exit</span>
        </div>
        <div className="text-2xl text-white">Log in</div>
      </div>

      <div className="px-4">
        {isLoading && <div className="absolute top-0 left-0 z-50 flex flex-col justify-center bg-white bg-opacity-70 w-full h-full">
          <Loader />
          </div>}
        <div>
          <h1 className="font-black leading-tight text-[2.8rem] mb-5">
            Let's get you logged in
          </h1>
          <p className="font-light">Enter your credentials below</p>
        </div>

        <div>

          <Formik
            initialValues={{
              email: "",
              password: "",
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

              if (!values.password) {
                errors.password = "Required";
              }
              return errors;
            }}
            onSubmit={async(values, { setSubmitting }) => {
                try{
                  await loginHandler(values.email, values.password)
                  localStorage.setItem("email", values.email);
                  setSubmitting(false);
                  return
                } catch(e){
                  console.log(e)
                  console.log('FAILED!')
                  return
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
                className="flex flex-col h-[25vh] min-h-[250px] justify-between"
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

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      placeholder="Password"
                      className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                    />
                    { showPassword ? <AiFillEyeInvisible className="absolute right-2 top-7 text-grey-light hover:text-purple cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> : <AiFillEye className="absolute right-2 top-7 text-grey-light hover:text-purple cursor-pointer" onClick={() => setShowPassword(!showPassword)} /> }
                  </div>

                  <div className="text-error-500">
                    {errors.password && touched.email && errors.password}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-gradient"
                >
                  Next
                </button>
              </form>
            )}
          </Formik>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default Login;
