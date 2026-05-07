const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
class UserController {
  async register(req, res) {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !phone || !password) {
        return res.status(400).json({
          success: false,
          message: "all fields are needed!",
        });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          message: "user already registered!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      const userData = new User({
        name,
        email,
        phone,
        password: hashPass,
      });
      const data = await userData.save();
      return res.status(200).json({
        success: true,
        message: "user registered successfully!",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "all fields are needed!",
        });
      }

      const isExist = await User.findOne({ email });
      if (!isExist) {
        return res.status(400).json({
          success: false,
          message: "user is not registered!",
        });
      }

      const isMatch = await bcrypt.compare(password, isExist.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "password did not match!",
        });
      }

      const token = jwt.sign(
        {
          id: isExist._id,
          name: isExist.name,
          email: isExist.email,
          role: isExist.role,
          phone: isExist.phone,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      return res.status(200).json({
        success: true,
        message: "token generated successfully!",
        token,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new UserController();
