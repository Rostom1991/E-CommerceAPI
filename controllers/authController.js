const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

//CREATE TOKEN
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

//SIGN-UP (Create a User)
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  //Validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please Complete All Fields" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Email is Not Valid" });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password is Weak" });
  }
  const usernameExist = await userModel.findOne({ username });
  if (usernameExist) {
    return res.status(400).json({ error: "Username Already Exists" });
  }
  const emailExist = await userModel.findOne({ email });

  if (emailExist) {
    return res.status(400).json({ error: "Email Already Exists" });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    //CALL TOKEN FUNCTION
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "All Fields Must Be Filled" });
  }
  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Username Incorrect" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Password Incorrect" });
    }

    //CALL TOKEN FUNCTION
    const token = createToken(user._id);
    res.status(200).json({ username, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUp, login };
