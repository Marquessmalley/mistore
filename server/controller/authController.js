const User = require("../models/user");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
// @desc Login
// @route POST /auth
// @access Public
module.exports.login = async (req, res, next) => {
  try {
    const userAgent = req.headers["user-agent"];
    console.log(userAgent);
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", error: true });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist. Please try again.",
        errror: true,
      });
    }

    const pass = await user.correctPassword(password, user.password);

    if (!pass) {
      return res
        .status(400)
        .json({ message: "Incorrect password", errror: true });
    }

    const accessToken = jwt.sign(
      {
        userInfo: {
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      {
        userInfo: {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true, // accessible only by web server
      secure: true, // The Secure flag ensures that cookies are only transmitted over secure (HTTPS) connections
      sameSite: "None", // cross-site cookie
      domain: ".mistrains.onrender.com",
      path: "/admin-dash",
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expir
    });

    res.json({ message: "User successfully logged in", accessToken });
  } catch (err) {
    console.log(err);
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Private
module.exports.refresh = (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie?.jwt)
    return res.status(401).json({ message: "Unauthorized user" });
  jwt.verify(
    cookie.jwt,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decode) => {
      try {
        if (err) res.status(403).json({ message: "Forbiden" });
        const user = await User.findOne({
          email: decode.userInfo.email,
        }).select("-password");

        if (!user) res.status(401).json({ message: "User unauthorized" });
        const accessToken = jwt.sign(
          {
            userInfo: user,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );
        res.json({ accessToken });
      } catch (err) {
        console.log(err);
      }
    }
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Private
module.exports.logout = (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie clear" });
};
