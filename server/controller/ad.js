const adModel = require("../models/ad");

const adPoster = async (req, res, next) => {
  try {
    const exist = await adModel.find({ ...req.body });

    if (exist) {
      return res.status(400).send({ message: "Ad Already Exists" });
    }

    const ad = new adModel({
      ...req.body,
    });

    await ad.save();

    return res.status(200).send({ message: "Ad Added Successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Something Went Wrong" });
  }
};

const adGeter = async (req, res) => {
  try {
    const ads = await adModel.find();
    return res.send({ message: "success", data: ads });
  } catch (err) {
    return res.status(500).send({ message: "Something Went Wrong" });
  }
};

module.exports = {
  adGeter,
  adPoster,
};
