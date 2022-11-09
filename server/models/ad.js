const { model, Schema } = require("mongoose");

const adSchema = new Schema({
  companyId: { type: Schema.Types.ObjectId, required: true },
  primaryText: { type: String, required: true },
  headline: { type: String, required: true },
  description: { type: String, required: false },
  CTA: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const adModel = model("ad", adSchema);

module.exports = adModel;
