import { Formik } from "formik";
import { useEffect, useState } from "react";

const ConfirmEmail = (props) => {
  const [email, setEmail] = useState(localStorage.getItem("email"));
// ------- THIS WAS CAUSING SAFARI TO NOT LOAD THE WEBSITE -------
  // useEffect(() => {
  //   const obscureEmail = (val) => {
  //      return val.replace(/(?<=.).(?=.*@)/g, "*");
  //   }
  //   setEmail(obscureEmail(email));
  // }, []);

  return (
    <div className="px-4 animate__animated animate__fadeInUp animate__faster">
      <div>
        <h1 className="font-black leading-tight text-[2.8rem] mb-5">Confirm your email address</h1>
        <p className="font-light">
        We have sent you an email with a One Time Pin (OTP) to { email }, please enter it below.
        </p>
      </div>

      <div>
        <Formik
          initialValues={{ otp: ""}}
          validate={(values) => {
            const errors = {};
            if (!values.otp) {
              errors.otp = "Required";
            } else if (
                !/\b\d{4}\b/.test(values.otp)
            ) {
              errors.otp = "Invalid OTP code";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              props.nextStep();
            }, 400);
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
                  type="text"
                  name="otp"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.otp}
                  className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                />
                <div className="text-error-500">
                  {errors.otp && touched.otp && errors.otp}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gradient mt-10"
              >
                Verify
              </button>

              <div className="btn btn-white mt-4"><span>Resend OTP</span></div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ConfirmEmail;
