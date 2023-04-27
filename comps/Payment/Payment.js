import { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import currenciesData from "./currencies.json";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

// platform fee 6.29%
const Payment = (props) => {
  const [error, setError] = useState(null);
  const [amountToCents, setAmountToCents] = useState(0);
  const [chargeAmount, setChargeAmount] = useState(0);
  const [amountError, setAmountError] = useState(null);
  const [yoco, setYoco] = useState(null);
  const [platformFee, setPlatformFee] = useState(0.0629);
  

  const currencies = currenciesData;


const handleCharge = async (token, amountInCents, currency, name, description, metadata) => {
  
  try {
    const response = await axios.post('/api/payment', {
      token,
      amountInCents,
      currency,
      name,
      description,
      metadata,
    });
    console.log(response.data.message); // this will log "[API] - Successful payment" if the payment was successful
    props.success(amountInCents/100, metadata.email, metadata.username)
  } catch (error) {
    console.error(error.message);
    // handle the error as needed
  }
}

const addPlatformFees = (amount, countryCode) => {
  const processingFee = countryCode === "ZA" ? 0.0295 : 0.0345;
  const totalPlatformFee = platformFee;
  // const platformFee = 0.03;
  // const tax = 0.15;

  // const totalProcessingFee = (amount * processingFee) + (amount * processingFee * tax);
  // const totalPlatformFee = (amount - totalProcessingFee) * platformFee;
  // const netAmount = amount + totalProcessingFee + totalPlatformFee;

  const totalProcessingFee = amount * totalPlatformFee;
  const netAmount = amount + totalProcessingFee;
  console.log(netAmount)
  setAmountToCents(Math.ceil(netAmount*100))
  setChargeAmount((Math.ceil(netAmount*100)/100).toFixed(2))
  if(amount === 0){
    setAmountError('Please add a valid amount')
  }

  return netAmount;
}

const dismissSuccess = () => {
  setShowSuccess(false)
  props.refresh()
}


useEffect(() => {
  console.log(props.user.personal.firstname)
  if (window.YocoSDK) {
    // The YocoSDK script has already loaded, so we can create the YocoSDK instance
    const instance = new window.YocoSDK({
      publicKey: process.env.NEXT_PUBLIC_YOCO_PK,
    });
    setYoco(instance);
  } else {
    // The YocoSDK script is not yet loaded, so we need to wait for it
    const script = document.querySelector('script[src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js"]');
    script.addEventListener('load', () => {
      const instance = new window.YocoSDK({
        publicKey: process.env.NEXT_PUBLIC_YOCO_PK,
      });
      setYoco(instance);
    });
  }
}, []);


  return (
    <div className="flex flex-col w-10/12 max-w-[350px] mx-auto p-7 rounded-xl bg-white">
      {/* {yoco && (
        <h1>yoco sdk ready</h1>
      )} */}

      <Formik
        initialValues={{
          amount: "",
          currency: "ZAR",
          name: "Chipn",
          description: props.id,
          email: "",
          username: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!/(.*[0-9])/i.test(values.amount)) {
            errors.amount = "Amount is required";
          }
          if(!values.username){
            errors.username = "Your name is required"
          }
          if (!values.currency) {
            errors.currency = "Currency is required";
          }
          if (!values.name) {
            errors.name = "Name is required";
          }
          if (!values.description) {
            errors.description = "Description is required";
          }
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            props.cancel(); // hide payment form
            console.log(JSON.stringify(values, null, 2));
            yoco.showPopup({
              amountInCents: amountToCents,
              currency: values.currency,
              name: values.name,
              description: values.description,
              metadata: {
                email: values.email,
                username: values.username,
              },
              callback: function(result) {
                console.log(result);

                // catch the country code for the card used
                // const country = result.source.country

                // This function returns a token that your server can use to capture a payment
                if (result.error) {
                  const errorMessage = result.error.message;
                  console.log("error occured: " + errorMessage);
                } else {
                  console.log(result);
                  console.log("card successfully tokenised: " + result.id);
                  
                  handleCharge(result.id, values.amount * 100, values.currency, values.name, values.description, {email: values.email, username: values.username});

                  //
                }
                // In a real integration - you would now pass this chargeToken back to your
                // server along with the order/basket that the customer has purchased.
              },
            });

            //   props.nextStep();
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
            className="flex flex-col min-h-[40vh] md:min-h-[40vh] justify-between"
          >
            <div className="relative">
              <IoIosCloseCircleOutline
                className="text-error-500 bg-white rounded-full text-3xl font-bold absolute -right-6 -top-6 cursor-pointer"
                onClick={props.cancel}
              />
              
              {/* {`Amount to cents: ` + amountToCents}
              {`Charge amount: ` + chargeAmount} */}

              <input
                type="hidden"
                name="name"
                disabled
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                placeholder="Name"
              />
              <div className="text-error-500">
                {errors.name && touched.name && errors.name}
              </div>

              <input
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                placeholder="Your name"
              />
              <div className="text-error-500">
                {errors.username && touched.username && errors.username}
              </div>

              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                placeholder="Email address"
              />
              <div className="text-error-500">
                {errors.email && touched.email && errors.email}
              </div>

              <div className="flex flex-row items-end">
                <span className="mb-2 font-bold">R</span>
                <input
                  type="text"
                  name="amount"
                  onChange={handleChange}
                  onInput={(e) => {
                    // setChargeAmount(null)
                    // setAmountError(null)
                    addPlatformFees(Number(e.target.value), "ZA");
                  }}
                  onBlur={handleBlur}
                  value={values.amount}
                  className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                  placeholder="Amount"
                />
              </div>
              <div className="text-error-500">
                {errors.amount && touched.amount && errors.amount}
              </div>

              {/* <Field
                as="select"
                name="currency"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.currency}
                className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                placeholder="Currency"
              >
                <option value="">Select currency</option>
                {currencies.map((currency) => (
                  <option key={currency.cc} value={currency.cc}>
                    {currency.cc}
                  </option>
                ))}
              </Field>
              <div className="text-error-500">
                {errors.currency && touched.currency && errors.currency}
              </div> */}

              <input
                type="hidden"
                name="description"
                disabled
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                placeholder="Description"
              />
              {/* <p className="text-white">{ `id: ${id}` }</p> */}
              <div className="text-error-500">
                {errors.description &&
                  touched.description &&
                  errors.description}
              </div>
            </div>
            {chargeAmount > 0 && <div>
              <p className="text-xs text-grey-light mt-5">A service fee of {platformFee * 100}% is added to your total to cover all card processing, banking and platform fees</p>
            </div>}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-gradient mt-5"
            >
              Pay R{chargeAmount}
            </button>

            

            {error && <p className="text-error-500">{error}</p>}
          </form>
        )}
      </Formik>
      {/* <Script src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js" /> */}
    </div>
  );
};

export default Payment;
