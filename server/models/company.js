const { model, Schema } = require("mongoose");

const companySchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const companyModel = model("company", companySchema);

module.exports = companyModel;
