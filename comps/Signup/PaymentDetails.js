import { useState } from 'react';
import { Field, Formik } from "formik";
import { doc, setDoc } from "firebase/firestore";
import Loader from "../Loader/Loader";


const PaymentDetails = (props) => {
  const db = props.db;
  const [showLoader, setShowLoader] = useState(false);

  return (
    <div className="relative px-4 animate__animated animate__fadeInUp animate__faster h-[80vh] overflow-scroll">
      {showLoader && (
        <div className="absolute z-[100] top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-white bg-opacity-90">
          <Loader />
        </div>
      )}
      <h1 className="font-black leading-tight text-[2.8rem] mb-5">
        Your payment details
      </h1>
      <p className="font-light">In order for us to pay you on the completion of your campaign, please provide your banking details below.</p>
      <Formik
        initialValues={{
          bankName: "",
          otherBankName: "",
          accNumber: "",
          accHolder: "",
          branchName: "",
          branchCode: "",
        }}
        validate={(values) => {
          const errors = {};
          if (values.bankName === "") {
            errors.bankName = "Please add your bank name";
          }
          if (!values.otherBankName && values.bankName === "Other") {
            errors.otherBankName = "Please add your other bank name";
          }
          if (values.bankName !== "Other") {
            values.otherBankName = ""
          }
          if (!values.accNumber) {
            errors.accNumber = "Required";
          } else if (!/^[0-9]{7,11}$/i.test(values.accNumber)) {
            errors.accNumber = "Account number must be between 7 and 11 digits.";
          }
          if (!values.accHolder) {
            errors.accHolder = "Required";
          } else if (!/^(?:\S\s*){3,40}$/i.test(values.accHolder)) {
            errors.accHolder = "Account holder name must be between 3 and 40 characters";
          }
          if (!values.branchName) {
            errors.branchName = "Required";
          }
          if (!values.branchCode) {
            errors.branchCode = "Required";
          }
          
          return errors;
        }}
        onSubmit={async(values, { setSubmitting }) => {
          setShowLoader(true);
            setSubmitting(false);
            try{
              localStorage.setItem("bankName", values.bankName);
              localStorage.setItem("otherBankName", values.otherBankName);
              localStorage.setItem("accNumber", values.accNumber);
              localStorage.setItem("accHolder", values.accHolder);
              localStorage.setItem("branchName", values.branchName);
              localStorage.setItem("branchCode", values.branchCode);
              const set = await setDoc(doc(db, 'chippin', localStorage.getItem('uid')), {
                banking:{
                  bankName: localStorage.getItem('bankName'),
                  otherBankName: localStorage.getItem('otherBankName'),
                  accNumber: localStorage.getItem('accNumber'),
                  accHolder: localStorage.getItem('accHolder'),
                  branchName: localStorage.getItem('branchName'),
                  branchCode: localStorage.getItem('branchCode'),
              }
              }, { merge: true });
              console.log(set);
            }catch(e){
              setShowLoader(false);
              console.log(e)
            }
            setShowLoader(false);
            setSubmitting(false);
            props.nextStep();
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
            <div className="pt-10">
              <div className="mb-5">
                <Field
                  as="select"
                  name="bankName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bankName}
                  className="w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light"
                  placeholder="Bank name"
                >
                  <option value="">Select bank</option>
                  <option value="First National Bank">
                    First National Bank
                  </option>
                  <option value="Standard Bank">Standard Bank</option>
                  <option value="Absa">Absa</option>
                  <option value="Capitec">Capitec</option>
                  <option value="Nedbank">Nedbank</option>
                  <option value="Other">Other</option>
                </Field>
                <div className="text-error-500">
                  {errors.bankName && touched.bankName && errors.bankName}
                </div>
              </div>

              
                <div className={values.bankName === 'Other' ? "relative z-[1] mb-5" : 'absolute -z-10'}>
                  <input
                    type="text"
                    id="otherBankName"
                    name="otherBankName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.otherBankName}
                    className="w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light"
                    placeholder="Please add your bank name here"
                  />
                  <div className="text-error-500">
                    {errors.otherBankName &&
                      touched.otherBankName &&
                      errors.otherBankName}
                  </div>
                </div>
              
              <div className="mb-5">
                <input
                  type="text"
                  name="accNumber"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.accNumber}
                  className="w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light"
                  placeholder="Account number"
                />
                <div className="text-error-500">
                  {errors.accNumber && touched.accNumber && errors.accNumber}
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="accHolder"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.accHolder}
                  className="w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light"
                  placeholder="Account holder"
                />
                <div className="text-error-500">
                  {errors.accHolder && touched.accHolder && errors.accHolder}
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="branchName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.branchName}
                  className="w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light"
                  placeholder="Branch name"
                />
                <div className="text-error-500">
                  {errors.branchName && touched.branchName && errors.branchName}
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="text"
                  name="branchCode"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.branchCode}
                  className="w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light"
                  placeholder="Branch code"
                />
                <div className="text-error-500">
                  {errors.branchCode && touched.branchCode && errors.branchCode}
                </div>
              </div>

            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-gradient my-20"
            >
              Next
            </button>
          </form>
        )}
      </Formik>
      
    </div>
  );
};

export default PaymentDetails;
