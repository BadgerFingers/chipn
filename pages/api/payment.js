import axios from "axios";

export default async function charge(req, res) {
  if (req.method === "POST") {
    const { token, amountInCents, currency, name, description, metadata } = req.body;
    try {
      const response = await axios.post(
        "https://online.yoco.com/v1/charges/",
        {
          token,
          amountInCents,
          currency,
          name,
          description,
          metadata: {
            email: metadata.email,
            username: metadata.username,
          },
        },
        {
          headers: {
            "X-Auth-Secret-Key": process.env.NEXT_PUBLIC_YOCO_SK,
          },
        }
      );
      res.status(200).json({ message: "[API] - Successful payment" });
    } catch (error) {
      res.status(500).json({ message: "Oops, there was a problem" });
    }
  }
}
