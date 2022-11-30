import { Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import Loader from "../Loader/Loader";

import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreatePassword = (props) => {
  const auth = getAuth();
  const [showLoader, setShowLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formErr, setFormErr] = useState();

  const [passChar8, setPassChar8] = useState(null);
  const [passNum1, setPassNum1] = useState(null);
  const [passUpper1, setPassUpper1] = useState(null);
  const [passLower1, setPassLower1] = useState(null);
  const [passSpecial1, setPassSpecial1] = useState(null);

  const TogglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const checkPassword = (src) => {
    // console.log(src);
    validPassword(src);
    if (!validPassword(src)) {
      setFormErr("Password not strong enough!");
    } else {
      setFormErr(null);
    }
  };

  const validPassword = (password) => {
    let char_8 = /^.{8,}/;
    let num_1 = /\d/;
    let upper_1 = /[A-Z]{1,}/;
    let char_special = /[$&+,:;=?@#|'<>.^*()%!_-]{1,}/;
    let lower_1 = /[a-z]{1,}/;

    if (char_8.test(password)) {
      setPassChar8(true);
    } else {
      setPassChar8(false);
    }

    if (num_1.test(password)) {
      setPassNum1(true);
    } else {
      setPassNum1(false);
    }

    if (upper_1.test(password)) {
      setPassUpper1(true);
    } else {
      setPassUpper1(false);
    }

    if (char_special.test(password)) {
      setPassSpecial1(true);
    } else {
      setPassSpecial1(false);
    }

    if (lower_1.test(password)) {
      setPassLower1(true);
    } else {
      setPassLower1(false);
    }

    if (
      char_8.test(password) &&
      num_1.test(password) &&
      upper_1.test(password) &&
      lower_1.test(password) &&
      char_special.test(password)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="relative px-4 animate__animated animate__fadeInUp animate__faster">
      {showLoader && (
        <div className="absolute z-[100] top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-white bg-opacity-90">
          <Loader />
        </div>
      )}
      <div>
        <h1 className="font-black leading-tight text-[2.8rem] mb-5">
          Create a password
        </h1>
        <p className="font-light">
          Please create a password so you can securely access your account.
        </p>
      </div>

      <div>
        <Formik
          initialValues={{
            password: "",
            passwordConfirmed: "",
            code: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.password = "Please enter a password";
            }
            if (!values.passwordConfirmed) {
              errors.passwordConfirmed = "Please connfirm your password";
            }
            if (values.passwordConfirmed !== values.password) {
              errors.passwordConfirmed = "Uh-Oh! Passwords do not match";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setFormErr("");
            setShowLoader(true);
            //
            createUserWithEmailAndPassword(
              auth,
              localStorage.getItem("email"),
              values.password
            )
              .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                localStorage.setItem("uid", user.uid);
                console.log(user);
                props.nextStep();
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                setShowLoader(false);
                setFormErr(errorMessage);
                setSubmitting(false);
              });
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
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-[45vh] justify-between"
            >
              <div>
                <div className="relative">
                  <span
                    className="absolute top-6 right-3 z-10 text-blue-dark text-xs cursor-pointer font-normal hover:text-blue"
                    onClick={TogglePasswordVisibility}
                  >
                    {!passwordVisible && (
                      <MdVisibility className="text-xl text-grey-light mt-[50%]" />
                    )}
                    {passwordVisible && (
                      <MdVisibilityOff className="text-xl text-grey-light mt-[50%]" />
                    )}
                  </span>
                  <Field
                    id="password"
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                    placeholder="Password"
                    onInput={(e) => checkPassword(e.target.value)}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-xs text-error-500"
                />

                <div className="relative">
                  <span
                    className="absolute top-6 right-3 z-10 text-blue-dark text-xs cursor-pointer font-normal hover:text-blue"
                    onClick={TogglePasswordVisibility}
                  >
                    {!passwordVisible && (
                      <MdVisibility className="text-xl text-grey-light mt-[50%]" />
                    )}
                    {passwordVisible && (
                      <MdVisibilityOff className="text-xl text-grey-light mt-[50%]" />
                    )}
                  </span>
                  <Field
                    id="passwordConfirmed"
                    type={passwordVisible ? "text" : "password"}
                    name="passwordConfirmed"
                    className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                    placeholder="Confirm password"
                  />
                </div>
                <ErrorMessage
                  name="passwordConfirmed"
                  component="div"
                  className="text-xs text-error-500"
                />

                <ul className="flex flex-row flex-wrap mt-5">
                  <li className="flex flex-row items-center font-light text-xs w-1/2 my-1">
                    <span>
                      <FaCheckCircle
                        className={
                          passChar8
                            ? "text-md text-success-500 mr-1"
                            : "text-md text-grey-light mr-1"
                        }
                      />
                    </span>
                    Min 8 Characters
                  </li>

                  <li className="flex flex-row items-center font-light text-xs w-1/2 my-1">
                    <span>
                      <FaCheckCircle
                        className={
                          passNum1
                            ? "text-md text-success-500 mr-1"
                            : "text-md text-grey-light mr-1"
                        }
                      />
                    </span>
                    One Number
                  </li>

                  <li className="flex flex-row items-center font-light text-xs w-1/2 my-1">
                    <span>
                      <FaCheckCircle
                        className={
                          passUpper1
                            ? "text-md text-success-500 mr-1"
                            : "text-md text-grey-light mr-1"
                        }
                      />
                    </span>
                    One Uppercase Letter
                  </li>

                  <li className="flex flex-row items-center font-light text-xs w-1/2 my-1">
                    <span>
                      <FaCheckCircle
                        className={
                          passSpecial1
                            ? "text-md text-success-500 mr-1"
                            : "text-md text-grey-light mr-1"
                        }
                      />
                    </span>
                    Special Character
                  </li>

                  <li className="flex flex-row items-center font-light text-xs w-1/2 my-1">
                    <span>
                      <FaCheckCircle
                        className={
                          passLower1
                            ? "text-md text-success-500 mr-1"
                            : "text-md text-grey-light mr-1"
                        }
                      />
                    </span>
                    One Lowercase Letter
                  </li>
                </ul>

                {formErr && <p className="text-error-500 text-sm">{formErr}</p>}
              </div>
              <button
                type="submit"
                className="btn btn-gradient"
                disabled={isSubmitting}
              >
                Next
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreatePassword;
