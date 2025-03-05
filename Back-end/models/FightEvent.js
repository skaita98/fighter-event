const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let fighterSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    gsm: {
      type: Number,
    },
  },
  {
    collection: "fighters",
  }
);

module.exports = mongoose.model("FightEvent", fighterSchema);
