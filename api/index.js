const express = require("express");
const cors = require("cors");
const Transaction = require("./models/transaction");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/transaction", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const { Name, Price, Datetime, Remark } = req.body;
    const trans = await Transaction.create({ Name, Price, Datetime, Remark });
    res.json(trans);
  } catch (error) {
    res.json(error.message);
  }
});

app.get("/transaction", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const trans = await Transaction.find().sort({ Datetime: 1 });
    res.json(trans);
  } catch (error) {
    res.json(error.message);
  }
});

app.listen(4000);
