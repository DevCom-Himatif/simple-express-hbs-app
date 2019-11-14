const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: { type: String, required: true },
  first_name: { type: String, required: true, max: 100 },
  family_name: { type: String, required: true, max: 100 }
});

module.exports = mongoose.model("User", UserSchema);
