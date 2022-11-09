const { Router } = require("express");
const { companyGetter, companyPoster } = require("../controller/company");

const companyRouter = Router();

companyRouter.get("/", companyGetter);
companyRouter.post("/", companyPoster);

module.exports = companyRouter;
