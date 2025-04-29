const mongoose = require('mongoose');

const fooditemSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  cuisineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cuisine',
    required: true,
  },
  isVeg: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdTs: {
    type: Date,
    default: Date.now,
  },
  updatedTs: {
    type: Date,
    default: Date.now,
  }
});


const FooditemModel = mongoose.model('Fooditems', fooditemSchema);

module.exports = FooditemModel;
