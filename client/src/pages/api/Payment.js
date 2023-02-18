import axios from "axios";

const Payment = (props) => {
    console.log(props)
    return ( <div><h1>api/payment</h1></div>);
 }
  
 export default Payment;





//    axios
//      .post(
//       "https://online.yoco.com/v1/charges/",
//       {
//         token: token,
//         amountInCents: amount * 100,
//         currency: currency,
//         name: name,
//         description: description,
//         metadata: {
//           email: email,
//         },
//       },
//       {
//           headers: {
//             "X-Auth-Secret-Key": secretKey,
//           },
//       })
//      .then((result) => {
//        res.status(200).send({
//          message:
//            "[API] - Successful payment",
//        });
//        return result;
//      })
//      .catch((err) => {
//        res.status(500).send({
//          message:
//            "Oops, there was a problem, email"
//        });
//      });
