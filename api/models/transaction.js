const mongoose = require("mongoose");
const { Schema, model } = mongoose

const schema = new Schema({
  Name: { type: String, required: true },
  Price: { type: Number, required: true },
  Datetime: { type: Date, required: true },
  Remark: { type: String, required: true },
});

const TransactionModel = model('Transaction',schema)

module.exports = TransactionModel