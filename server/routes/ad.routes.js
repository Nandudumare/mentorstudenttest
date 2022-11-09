const { Router } = require("express");
const { adPoster, adGeter } = require("../controller/ad");

const adRouter = Router();

adRouter.get("/", adGeter);
adRouter.post("/", adPoster);

module.exports = adRouter;
