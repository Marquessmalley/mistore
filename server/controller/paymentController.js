const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.listPayments = async (req, res) => {
  try {
    const paymentsList = await stripe.paymentIntents.list();
    res.json({ paymentsList: paymentsList });
  } catch (err) {
    console.log(err);
  }
};

module.exports.createPaymentIntent = async (req, res) => {
  try {
    const { items, totalCost } = req.body;

    const totalCostInCents = Math.round(totalCost * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCostInCents ? totalCostInCents : Math.round(0.5 * 100),
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.log(err);
  }
};
