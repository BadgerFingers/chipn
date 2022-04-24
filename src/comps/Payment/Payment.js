import bgSplash from "../../img/Background-splash.png";
import logoWht from "../../img/logo-white.svg";
import { Formik, Field } from "formik";
import currenciesData from "./currencies.json";
import 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js'

const Payment = () => {
    const currencies = currenciesData

    let params = new URLSearchParams(window.location.search);
    let paramid = params.get("id");

    const yoco = new window.YocoSDK({
        publicKey: 'pk_test_ed3c54a6gOol69qa7f45',
      });

  return (
    <div className="flex flex-col justify-between py-40 px-10 h-[100vh]">
      <img
        src={logoWht}
        alt="chippin logo"
        className="w-10/12 max-w-[180px] mx-auto"
      />

      <div className="w-full md:w-3/12 mx-auto">
        <Formik
          initialValues={{
            amount: "",
            currency: "",
            name: "Chippin",
            description: paramid,
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
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            
                yoco.showPopup({
                  amount: values.amount * 100,
                  currency: values.currency,
                  name: values.name,
                  description: values.description,
                  callback: function (result) {
                      console.log(result);
                    // This function returns a token that your server can use to capture a payment
                    if (result.error) {
                      const errorMessage = result.error.message;
                      alert("error occured: " + errorMessage);
                    } else {
                      alert("card successfully tokenised: " + result.id);
                    }
                    // In a real integration - you would now pass this chargeToken back to your
                    // server along with the order/basket that the customer has purchased.
                  }
                })

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
              className="flex flex-col h-[55vh] justify-between"
            >
              <div>
                <input
                  type="text"
                  name="amount"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.amount}
                  className="w-full p-2 mt-4 border border-x-transparent border-t-transparent border-b-gray-light"
                  placeholder="Amount"
                />
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
                        <option key={currency.cc} value={currency.cc}>{ currency.cc }</option>
                    ))}
                </Field>
                <div className="text-error-500">
                  {errors.currency && touched.currency && errors.currency}
                </div>

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
                  {errors.description && touched.description && errors.description}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-gradient"
              >
                Pay
              </button>
            </form>
          )}
        </Formik>
      </div>

      <img
        src={bgSplash}
        alt=""
        className="absolute -z-[1] inset-0 h-full w-full object-cover"
      />
    </div>
  );
};

export default Payment;
