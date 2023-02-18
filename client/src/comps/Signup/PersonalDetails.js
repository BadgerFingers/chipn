import { useState } from 'react';
import { Formik } from "formik";
import { doc, setDoc } from "firebase/firestore";
import Loader from "../Loader/Loader";


const PersonalDetails = (props) => {
  const db = props.db;
  const [showLoader, setShowLoader] = useState(false);

  return (
    <div className="relative px-4 animate__animated animate__fadeInUp animate__faster">
      {showLoader && (
        <div className="absolute z-[100] top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-white bg-opacity-90">
          <Loader />
        </div>
      )}
      <div>
        <h1 className="font-black leading-tight text-[2.8rem] mb-5">Your personal details</h1>
        <p className="font-light">
        Please let us get to know you a little better.
        </p>
      </div>

        <div>
        <Formik
       initialValues={{
         firstname: '',
         lastname: ''
        }}
       validate={values => {
         const errors = {};
         if (!/(.*[a-z]){2}/i.test(values.firstname)) {
          errors.firstname = "Please add your first name";
        }
        if (!/(.*[a-z]){2}/i.test(values.lastname)) {
          errors.lastname = "Please add your last name";
        }
         return errors;
       }}
       onSubmit={async(values, { setSubmitting }) => {
        setShowLoader(true);
          try{
            localStorage.setItem("firstname", values.firstname);
            localStorage.setItem("lastname", values.lastname);
            const set = await setDoc(doc(db, 'chippin', localStorage.getItem('uid')), {
              personal:{
              firstname: values.firstname,
              lastname: values.lastname,
              email: localStorage.getItem('email'),
            }
            }, { merge: true });
            console.log(set);
          }catch(e){
            setShowLoader(false);
            console.log(e);
            return;
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
         <form onSubmit={handleSubmit} className="flex flex-col h-[55vh] justify-between">
           <div>
               <input
             type="text"
             name="firstname"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.firstname}
             className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
             placeholder="First name"
           />
           <div className="text-error-500">{errors.firstname && touched.firstname && errors.firstname}</div>

           <input
             type="text"
             name="lastname"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.lastname}
             className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
             placeholder="Last name"
           />
           <div className="text-error-500">{errors.lastname && touched.lastname && errors.lastname}</div>
           </div>
           
           <button type="submit" disabled={isSubmitting} className="btn btn-gradient">
             Next
           </button>
         </form>
       )}
     </Formik>
      </div>
    </div>
  );
};

export default PersonalDetails;
