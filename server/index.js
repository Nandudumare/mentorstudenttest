const connection = require("./config/db");
const express = require("express");
const adRouter = require("./routes/ad.routes");
const companyRouter = require("./routes/company.routes");
const companyModel = require("./models/company");
const adModel = require("./models/ad");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/ads", adRouter);
app.use("/company", companyRouter);

app.get("/:keyword", async (req, res, next) => {
  try {
    const { keyword } = req.params;

    const data = await companyModel.aggregate([
      { $match: { name: keyword } },
      {
        $lookup: {
          from: "ads",
          localField: "_id",
          foreignField: "companyId",
          as: "ads",
        },
      },
    ]);

    if (data.length === 0) {
      return res.status(400).send({
        message: "Not Found",
        data: [],
      });
    }
    return res.send({
      message: "success",
      data: data,
    });
  } catch (err) {
    console.log("err:", err);
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("listening on port 8080");
  } catch (err) {
    console.log(err);
  }
});
