import { Field, Formik } from "formik";

const CreateCampaign = (props) => {
    return (
        <div className="px-4 animate__animated animate__fadeInUp animate__faster h-[80vh] overflow-scroll">
            <h1 className="font-black leading-tight text-[2.8rem] mb-5">Your campaign details</h1>
            <Formik
       initialValues={{
         campaign: '',
         campaignAmount: 0,
         campaignDuration: 0,
         message: ''
        }}
       validate={values => {
         const errors = {};
         if (!/(.*[a-z]){2}/i.test(values.campaign)) {
          errors.campaign = "Please add your campaign name";
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
         <form onSubmit={handleSubmit} className="flex flex-col justify-between">
           <div>
               <label htmlFor="campaign" className="font-bold">Name of campaign</label>
               <input
             type="text"
             name="campaign"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.campaign}
             className="w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light"
             placeholder="Give your campaign a name"
           />
           <div className="text-error-500">{errors.campaign && touched.campaign && errors.campaign}</div>
            
            <div className="border border-grey-superlight shadow-lg rounded-md flex flex-row mt-8 p-2">
                <div className="w-1/2 flex flex-col items-center border border-transparent border-r-grey-dark">
                    <div className="font-bold">R<span className="text-2xl">{values.campaignAmount}</span>.00</div>
                    <p className="text-grey-light">Goal amount</p>
                </div>
                <div className="w-1/2 flex flex-col items-center">
                    <div className="font-bold"><span className="text-2xl">{values.campaignDuration}</span> days</div>
                    <p className="text-grey-light">Goal amount</p>
                </div>
            </div>

            <label htmlFor="campaignAmount" className="font-bold mt-10 block">How much do you need?</label>
            <input
                type="range"
                id="campaignAmount"
                name="campaignAmount"
                onInput={handleChange}
                onBlur={handleBlur}
                value={values.campaignAmount}
                min="1000"
                max="10000"
                step="100"
                className="w-full mt-4"
            />

            <label htmlFor="campaignDuration" className="font-bold mt-10 block">Campaign duration</label>
            <input
                type="range"
                id="campaignDuration"
                name="campaignDuration"
                onInput={handleChange}
                onBlur={handleBlur}
                value={values.campaignDuration}
                min="7"
                max="90"
                step="1"
                className="w-full mt-4"
            />

            <label htmlFor="message" className="font-bold mt-10 block">Personalised message</label>
            <Field
                as="textarea"
                id="message"
                name="message"
                rows="5"
                className="w-full my-8 rounded-md shadow-lg"
                value={values.message}
            />

           </div>
           



           <button type="submit" disabled={isSubmitting} className="btn btn-gradient w-[160px] mx-auto mb-20">
             Next
           </button>
         </form>
       )}
     </Formik>
        </div>
    );
}
 
export default CreateCampaign;