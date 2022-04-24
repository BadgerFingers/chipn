import { Formik } from "formik";

const PersonalDetails = (props) => {
  return (
    <div className="px-4 animate__animated animate__fadeInUp animate__faster">
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
