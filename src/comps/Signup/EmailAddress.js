import { Formik } from "formik";

const EmailAddress = (props) => {
  return (
    <div className="px-4">
      <div>
        <h1 className="font-black leading-tight text-[2.8rem] mb-5">Your email address</h1>
        <p className="font-light">
          To get started please enter your email address below.
        </p>
      </div>

        <div>
        <Formik
       initialValues={{ email: ''}}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
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
         <form onSubmit={handleSubmit} className="flex flex-col h-[45vh] justify-between">
           <div>
               <input
             type="email"
             name="email"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
             className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
           />
           <div className="text-error-500">{errors.email && touched.email && errors.email}</div>
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

export default EmailAddress;
