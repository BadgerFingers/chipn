import { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import currenciesData from "./currencies.json";
import { IoIosCloseCircleOutline } from "react-icons/io";


const Payment = (props) => {
  const [error, setError] = useState(null);
  const [amountToCents, setAmountToCents] = useState(0);
  const [chargeAmount, setChargeAmount] = useState(0);
  const [amountError, setAmountError] = useState(null);

  const currencies = currenciesData;

  const yoco = new window.YocoSDK({
    publicKey: process.env.REACT_APP_YOKO_PK, //'pk_test_ed3c54a6gOol69qa7f45'
  });

const handleCharge = async (token, amountincents, currency, name, description, metadata) => {
  const postBody = {
    token: token,
    amountInCents: amountincents,
    currency: currency,
    name: name,
    description: description,
    metadata: metadata,
  }

  const response = await fetch('/api/payment', {
    method: 'POST',
    body: JSON.stringify(postBody),
    headers: {
      'Content-Type': 'application/json',
    }
  })

  const json = await response.json();

  if (!response.ok) {
    setError(json.error)
  }
  if (response.ok){
    setError(null)
    console.log('Response OK: ', json)
    console.log('do something with the response')
  }
}

const addPlatformFees = (amount, countryCode) => {
  const processingFee = countryCode === "ZA" ? 0.0295 : 0.0345;
  const platformFee = 0.03;
  const tax = 0.15;

  const totalProcessingFee = (amount * processingFee) + (amount * processingFee * tax);
  const totalPlatformFee = (amount - totalProcessingFee) * platformFee;

  const netAmount = amount + totalProcessingFee + totalPlatformFee;
  console.log(netAmount)
  setAmountToCents(Math.ceil(netAmount*100))
  setChargeAmount((Math.ceil(netAmount*100)/100).toFixed(2))
  if(amount === 0){
    setAmountError('Please add a valid amount')
  }

  return netAmount;
}

// useEffect(() => {
//   const amount = 100; // 100 or any other amount
//   const countryCode = "ZA"; // or any other country code
//   const netAmount = addPlatformFees(amount, countryCode);
//   console.log(netAmount); // output: 106.40 -- 93.70[ZA] 106.85 -- 93.15[USA]
//   //props.success(netAmount)
// }, [])


  return (
    <div className="flex flex-col w-10/12 max-w-[350px] mx-auto p-7 rounded-xl bg-white">
      <Formik
        initialValues={{
          amount: "",
          currency: "ZAR",
          name: "Chipn",
          description: props.id,
          email: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!/(.*[0-9])/i.test(values.amount)) {
            errors.amount = "Amount is required";
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
              },
              callback: function(result) {
                console.log(result);
                const country = result.source.country
                // This function returns a token that your server can use to capture a payment
                if (result.error) {
                  const errorMessage = result.error.message;
                  console.log("error occured: " + errorMessage);
                } else {
                  console.log(result);
                  console.log("card successfully tokenised: " + result.id);
                  
                  handleCharge(result.id, values.amount * 100, values.currency, values.name, values.description, {email: values.email})

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
              {`Amount to cents: ` + amountToCents}
              {`Charge amount: ` + chargeAmount}

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
                  onInput={() => {
                    setChargeAmount(null)
                    setAmountError(null)
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

              <Field
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
              </div>

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

            { chargeAmount && (amountToCents !== 0) && !errors.length &&
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-gradient mt-5"
            >
              Pay R{chargeAmount}
            </button>
            }

            { !chargeAmount && !errors.length &&
            <>
            <div className="p-4 font-thin border-gray-400 rounded-lg">
              To ensure that you donate the full amount, we need to add our platform fee of ~5% to your payment.
            </div>
            <button
              type="button"
              className="btn btn-white mt-5"
              onClick={() => addPlatformFees(Number(values.amount), "ZA")}
            >
              <span>Add platform fees</span>
            </button>
            <span className="text-error-500 text-sm text-center">{amountError}</span>
            </>
            }

            {error && <p className="text-error-500">{error}</p>}
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Payment;
