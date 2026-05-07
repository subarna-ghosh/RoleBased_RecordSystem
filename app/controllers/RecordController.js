const Record = require("../models/Record");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class RecordController {
  async create(req, res) {
    try {
      console.log(req.body);
      const { title, description } = req.body;
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "all fields are needed!",
        });
      }

      const record = new Record({
        title,
        description,
        isCreatedBy: req.user.id,
      });
      
      const data = await record.save();
      return res.status(200).json({
        success: true,
        message: "Record created successfully!",
        count: data.length,
        data,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}
module.exports = new RecordController();
