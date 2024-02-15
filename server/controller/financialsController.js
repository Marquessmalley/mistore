const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.accountBalance = async (req, res) => {
  try {
    const balance = await stripe.balance.retrieve();
    res.json({ balance: balance });
  } catch (err) {
    console.log(err);
  }
};
