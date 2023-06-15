const rateLimit = require("express-rate-limit");

module.exports.loginLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 5, // limits each IP to 5 login requtes per `window` per minute
  message: {
    message:
      "Too many login attempts from this IP, please try again after 60 seconds",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: true,
});
