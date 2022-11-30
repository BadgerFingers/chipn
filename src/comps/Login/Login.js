import { useState, useEffect } from "react";
import { FaAngleLeft } from 'react-icons/fa';
import { Formik } from "formik";

const Login = (props) => {
    const [step, setStep] = useState(null);

    useEffect(() => {
        if(props.active){
            setStep(1); // 6
        }
    }, [props.active])

    return (
        <div className="animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-full md:w-7/12 lg:w-5/12 h-[85%] top-[15%] left-0 right-0 mx-auto">
            <div className={ props.active ? 'transition-all duration-300 flex flex-row justify-between relative -top-20 px-5' : 'transition-all duration-300 flex flex-row justify-between relative top-20 px-5' }>
                <div className='flex flex-row items-center text-white'
                    onClick={() => {
                        props.closeLogin();
                        setStep(1);
                      }
                    }>
                    <FaAngleLeft className='text-xl' /> <span>exit</span>
                </div>
                <div className='text-2xl text-white'>
                    Let's get started
                </div>
            </div>

            <div className="px-4">
      <div>
        <h1 className="font-black leading-tight text-[2.8rem] mb-5">Let's get you logged in</h1>
        <p className="font-light">
          Enter your credentials below
        </p>
      </div>

        <div>
        <Formik
       initialValues={{
        email: '',
        password: ''
    }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }

         if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
          //  alert(JSON.stringify(values, null, 2));
            try{
              localStorage.setItem("email", values.email);
            }catch(e){
              console.log(e)
              return;
            }
           setSubmitting(false);
           props.success();
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
         <form onSubmit={handleSubmit} className="flex flex-col h-[45vh] border justify-between">
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
           <div className="text-error-500">{errors.email && touched.email && errors.email}</div>
           
               <input
             type="password"
             name="password"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
             placeholder="Password"
             className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
           />
           <div className="text-error-500">{errors.password && touched.email && errors.password}</div>
           </div>
           
           <button type="submit" disabled={isSubmitting} className="btn btn-gradient">
             Next
           </button>
         </form>
       )}
     </Formik>
      </div>
    </div>
        </div>
    );
}
 
export default Login