const mongoose = require("mongoose");

const scheema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String, required: true },
  education: { type: Array, default: null },
  skill: { type: Array, default: null },
  experience: { type: Array, default: null },
  project: { type: Array, default: null },
  address: { type: Object, default: null },
  verified: { type: Boolean, default: false },
  bannerpic: { type: String, default: null },
  profilepic: { type: String, default: null },
  contact: {
    type: Object,
    default: { email: null, phone: null, linkedin: null, github: null },
  },
  // links:{type:Object}
});

const UserData = mongoose.model("user", scheema);

module.exports = UserData;
