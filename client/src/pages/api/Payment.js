import axios from "axios";

export default async function charge(req, res) {
  if (req.method === "POST") {
    const { token, amountInCents, currency, name, description, metadata } = req.body;
    axios
      .post(
        "https://online.yoco.com/v1/charges/",
        {
            token,
            amountInCents,
            currency,
            name,
            description,
            metadata: {
              email: metadata.email,
            },
        },
        {
          headers: {
            "X-Auth-Secret-Key": process.env.REACT_APP_YOKO_SK,
          },
        }
      )
      .then((res) => {
        return res.status(200).send({
          message: "[API] - Successful payment",
        });
      })
      .catch((err) => {
        const response = { status: 500, message: "Oops, there was a problem" };
        // handle the error as needed
        return response;
      });
  }
}
