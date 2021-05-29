const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClothesSchema = new Schema({
  url: String,
});

const Clothes = mongoose.model('Clothes', ClothesSchema);
module.exports = Clothes;
