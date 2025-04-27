const mongoose = require('mongoose');
const resolveID  = require("../helpers/resolveID"); // Import resolveID
const category = require("../models/categoryModel");
const cuisine = require("../models/cuisineModel");


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
    required: true,
  },
  cuisineId: {
    type: mongoose.Schema.Types.ObjectId,
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


fooditemSchema.pre('save', async function(next) {
  try {
                                 // Resolve categoryId using the Category model
    if (this.categoryId && mongoose.Types.ObjectId.isValid(this.categoryId)) {
      this.categoryId = await resolveID(this.categoryId, category);
    }

                                 // Resolve cuisineId using the Cuisine model
    if (this.cuisineId && mongoose.Types.ObjectId.isValid(this.cuisineId)) {
      this.cuisineId = await resolveID(this.cuisineId, cuisine);
    }

    next(); 
  } catch (err) {
    next(err);  
  }
});

const FooditemModel = mongoose.model('Fooditems', fooditemSchema);

module.exports = FooditemModel;
