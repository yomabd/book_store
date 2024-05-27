const userModel = require("../models/userModel.js");

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const userData = await userModel.findOne(j)
    userModel.findOne({ email: email }).then((user) => {
      if (user) {
        if (user.password === password) {
          return res.status(200).json("Successful");
        } else {
          return res.status(404).json({ message: "password is incorrect" });
        }
      } else {
        return res.status(404).send({ message: "No record found!" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      return res.status(404).send({
        message: "send all required fields: name, email, password",
      });
    }
    const user = await userModel.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signin,
  signup,
};
