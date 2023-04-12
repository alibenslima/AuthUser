const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const config = require("config");
const secret = config.get("secret");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const existantuser = await User.findOne({ email });
  if (existantuser) {
    return res.status(409).json({ msg: "user already exixt" });
  } else {
    try {
      const newUser = new User({
        fullName,
        email,
        password,
      });
      /////////////////////////////////////////////
      let salt = await bcryptjs.genSalt(10);
      let hash = await bcryptjs.hash(password, salt);
      newUser.password = hash;
      ////////////////////////////////////
      await newUser.save();
      /////////////////
      const payload = { _id: newUser._id };
      let token = jwt.sign(payload, secret);
      ///////////////////////
      res.send({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        token,
      });
      // res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "wrong informations" });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(404).json({ msg: "wrong informations" });
    const payload = { _id: user._id };
    let token = jwt.sign(payload, "shhhhh");
    ///////////////////////
    res.send({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.auth = (req, res) => {
  res.send(req.user);
};
