import { useState } from 'react';
import { Field, Formik } from "formik";
import { doc, setDoc } from "firebase/firestore";
import Loader from "../Loader/Loader";


const CreateCampaign = (props) => {
  const db = props.db;
  const [showLoader, setShowLoader] = useState(false);
  
  const randomStringGenerator = () => {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  const calculateEndDate = (startDate, duration) => {
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate;
  }

    return (
        <div className="relative px-4 animate__animated animate__fadeInUp animate__faster h-[80vh] overflow-scroll">
          {showLoader && (
        <div className="absolute z-[100] top-0 left-0 flex flex-col justify-center items-center w-full h-full bg-white bg-opacity-90">
          <Loader />
        </div>
      )}
            <h1 className="font-black leading-tight text-[2.8rem] mb-5">Your campaign details</h1>
            <Formik
       initialValues={{
         campaign: '',
         campaignAmount: 0,
         campaignDuration: 0,
         message: '',
         fees: null
        }}
       validate={values => {
         const errors = {};
         if (!/(.*[a-z]){2}/i.test(values.campaign)) {
          errors.campaign = "Please add your campaign name";
        }
        if ((!values.fees)) {
          errors.fees = "Please set who will cover the platform service fees";
        }
         return errors;
       }}
       onSubmit={async(values, { setSubmitting }) => {
        setShowLoader(true);
        console.log(calculateEndDate(new Date(), values.campaignDuration))
        //  setTimeout(async() => {
          //  alert(JSON.stringify(values, null, 2));
          try{
            localStorage.setItem("campaign", values.campaign);
            localStorage.setItem("campaignAmount", values.campaignAmount);
            localStorage.setItem("campaignDuration", values.campaignDuration);
            localStorage.setItem("status", "active");
            localStorage.setItem("completionDate", calculateEndDate(new Date(), values.campaignDuration));
            localStorage.setItem("message", values.message);
            localStorage.setItem("campaignID", randomStringGenerator());
            localStorage.setItem("fees", values.fees)

              const set = await setDoc(doc(db, 'chippin', `${localStorage.getItem('uid')}/campaigns/${localStorage.getItem('campaignID')}`), {
                  name: localStorage.getItem('campaign'),
                  campaignAmount: localStorage.getItem('campaignAmount'),
                  amountContributed: 0,
                  campaignDuration: localStorage.getItem('campaignDuration'),
                  status: localStorage.getItem('status'),
                  completionDate: localStorage.getItem('completionDate'),
                  campaignMessage: localStorage.getItem('message'),
                  feesPayableBy: localStorage.getItem("fees")
              }, { merge: true });
              console.log(set);
          }catch(e){
            setShowLoader(false);
            setSubmitting(false);
            console.log(e)
            return
          }
            setShowLoader(false);
            setSubmitting(false);
            props.nextStep();
        //  }, 400);
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
                    <p className="text-grey-light">Campaign duration</p>
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
                min="50"
                max="15000"
                step="50"
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

<div>
              <h2 className="font-bold mt-0 block">Who will pay the platform service fee (6.29%)?</h2>
              <div className='flex flex-col'>
                <div className='flex flex-row'>
                  <input
                    type="radio"
                    id="fees"
                    className='mr-4'
                    name="fees"
                    onInput={handleChange}
                    value="Owner"
                  />
                  <p>I will</p>
                </div>

                <div className='flex flex-row'>
                  <input
                    type="radio"
                    id="fees"
                    className='mr-4'
                    name="fees"
                    onInput={handleChange}
                    value="Contributors"
                  />
                  <p>My Contributors will</p>
                </div>
                <div className="text-error-500">{errors.fees && touched.fees && errors.fees}</div>
              </div>
              
              <div className='my-5'>
                  <p className='text-sm p-2 border border-grey-light rounded-lg'>
                    {!values.fees && (
                      <span className='text-blue-500'>There is a platform fee of ~6% which is either payable by the campaign owner, or can be included as part of the contributors payments.</span>
                    )}
                    {values.fees === 'Owner' && (
                      <span className='text-slate-500'>This means that on the completion of your campaign, you as the campaign owner will be paid out the sum of your contributions received less the full service fee of 6.29%.</span>
                    )}
                    {values.fees === 'Contributors' && (
                      <span className='text-slate-500'>This means that a service fee of 6.9% will be added to any amounts contributed to your campaign. On the completion of your campaign, you as the campaign owner will be paid out 100% of the sum of your contributions received.</span>
                    )}
                  </p>
              </div>
            </div>

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