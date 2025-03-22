const express = require("express");
const stripe = require("stripe")("sk_test_51OptiBGH41gt1tTCIHIU2a0X5K6v4UMqvhwe2unj2sKrOyUKJw1lmvHzjeQ0aKCIu51WkuYznxplSaEncB3CF5k800sZrK35CD");

const app = express();
const port = 3000; // Define your port

app.use(express.json()); // Middleware to parse JSON requests

// Create a payment intent
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body; // Extract amount from request body

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});

// Basic route to check the server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
