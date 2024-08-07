const userModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "invalid username or password" });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.APP_SECRETE_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "successful login", token: token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const signup = async (req, res) => {
  try {
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).send({
        message: "send all required fields: name, email, password",
      });
    }
    const { firstname, lastname, email, password } = req.body;
    //this also works
    // const { password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // const user = new userModel({
    //   firstname,
    //   lastname,
    //   email,
    //   password: hashedpassword,
    // });
    // const userData = await user.save();
    //this also works
    const userData = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashedpassword,
    });
    res.status(200).json(userData);
  } catch (error) {
    if (error.code === 11000 && error.keyValue.email) {
      res.status(409).json({ message: "Email already exists! " });
    }
    res.status(500).json({ message: "Server Error!" });
  }
};

//middleware to verify jwt from the user request

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unathorized user!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.APP_SECRETE_KEY);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  signin,
  signup,
  verifyJWT,
};
