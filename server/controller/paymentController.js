const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.createPaymentIntent = async (req, res) => {
  try {
    const { items, totalCost } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 2500,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });

    // console.log(paymentIntent);
  } catch (err) {
    console.log(err);
  }
};
