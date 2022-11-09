const companyModel = require("../models/company");

const companyGetter = async (req, res, next) => {
  try {
    const companies = await companyModel.find();
    return res.send({ message: "success", data: companies });
  } catch (err) {
    return res.status(500).send({ message: "Something Went Wrong" });
  }
};

const companyPoster = async (req, res, next) => {
  try {
    const { name, url } = req.body;
    const exist = await companyModel.findOne({ name });
    console.log('exist:', exist)

    if (exist) {
      return res.status(400).send({ message: "Company Already Exists" });
    }

    const company = new companyModel({
      ...req.body,
    });

    await company.save();

    return res.status(200).send({ message: "company Added Successfully" });
  } catch (err) {
    return res.status(500).send({ message: "Something Went Wrong" });
  }
};

module.exports = {
  companyPoster,
  companyGetter,
};
