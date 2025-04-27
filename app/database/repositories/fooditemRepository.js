const mongoose = require('mongoose');
const  resolveID  = require("../../helpers/resolveID");
const FooditemModel = require("../../models/fooditemModel");

// Create a new food item
const createFooditem = async (id, name, description, image, categoryId, cuisineId, isVeg, isActive) => {
  try {
    // Resolve categoryId and cuisineId if they are not MongoDB ObjectIds
    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      categoryId = await resolveID(categoryId, 'category');
    }
    if (cuisineId && !mongoose.Types.ObjectId.isValid(cuisineId)) {
      cuisineId = await resolveID(cuisineId, 'cuisine');
    }

    const newFooditem = await FooditemModel.create({
      id: id,
      name: name,
      description: description,
      image: image,
      categoryId: categoryId,
      cuisineId: cuisineId,
      isVeg: isVeg,
      isActive: isActive
    });
    return newFooditem;
  } catch (err) {
    throw new Error(`Error while creating fooditem: ${err.message}`);
  }
};

// Edit an existing food item
const editFooditem = async (fooditemId, newData) => {
  try {
    // Resolve categoryId, cuisineId and fooditemId if they are not MongoDB ObjectIds
    if (newData.fooditemId && !mongoose.Types.ObjectId.isValid(newData.fooditemId)) {
      newData.fooditemId = await resolveID(newData.fooditemId, 'fooditems')
    }

    if (newData.categoryId && !mongoose.Types.ObjectId.isValid(newData.categoryId)) {
      newData.categoryId = await resolveID(newData.categoryId, 'category');
    }
    if (newData.cuisineId && !mongoose.Types.ObjectId.isValid(newData.cuisineId)) {
      newData.cuisineId = await resolveID(newData.cuisineId, 'cuisine');
    }

    const fooditemObject = await FooditemModel.findOne(query);
    if (!fooditemObject) {
      return null;
    }

   

    // Update food item fields
    fooditemObject.id = newData.id;
    fooditemObject.isActive = newData.isActive;
    fooditemObject.name = newData.name;
    fooditemObject.description = newData.description;
    fooditemObject.image = newData.image;
    fooditemObject.categoryId = newData.categoryId;
    fooditemObject.cuisineId = newData.cuisineId;
    fooditemObject.isVeg = newData.isVeg;
    fooditemObject.updatedTs = new Date();

    const updatedFooditem = await fooditemObject.save();
    return updatedFooditem;
  } catch (err) {
    throw new Error(`Error while editing fooditem: ${err.message}`);
  }
};

// Delete a food item (soft delete by marking isActive false)
const deleteFooditem = async (fooditemId) => {
  try {
    const fooditemObject = await FooditemModel.findById(fooditemId);

    if (!fooditemObject) {
      return null;
    }

    fooditemObject.isActive = false;
    const updatedFooditem = await fooditemObject.save();
    return updatedFooditem;
  } catch (err) {
    throw new Error(`Error while deleting fooditem: ${err.message}`);
  }
};

// Get food item by customId or mongoId
const getFooditem = async (fooditemId) => {
  try {
    // Check if the provided fooditemId is a valid ObjectId
    const fooditemObject = await FooditemModel.findOne({
      _id: fooditemId,
      isActive: true
    });

    return fooditemObject;
  } catch (err) {
    throw new Error(`Error while fetching Food Item: ${err.message}`);
  }
};

// Get all food items
const getAllFooditems = async () => {
  try {
    const fooditems = await FooditemModel.find({ isActive: true });

    // Resolve categoryId and cuisineId if they are not MongoDB ObjectIds
    for (let fooditem of fooditems) {
      if (fooditem.categoryId && !mongoose.Types.ObjectId.isValid(fooditem.categoryId)) {
        fooditem.categoryId = await resolveID(fooditem.categoryId, 'category');
      }
      if (fooditem.cuisineId && !mongoose.Types.ObjectId.isValid(fooditem.cuisineId)) {
        fooditem.cuisineId = await resolveID(fooditem.cuisineId, 'cuisine');
      }
    }

    return fooditems;
  } catch (err) {
    throw new Error(`Error while fetching Food Items: ${err.message}`);
  }
};

// Get food items by categoryId (resolved if necessary)
const getFooditemsByCategoryId = async (categoryId) => {
  try {
    // Resolve categoryId if it's not a MongoDB ObjectId
    if (categoryId && !mongoose.Types.ObjectId.isValid(categoryId)) {
      categoryId = await resolveID(categoryId, 'category');
    }

    const fooditemObjects = await FooditemModel.find({
      categoryId: categoryId,
      isActive: true
    });

    return fooditemObjects;
  } catch (err) {
    throw new Error(`Error while fetching fooditem: ${err.message}`);
  }
}

// Get food items by cuisineId (resolved if necessary)
const getFooditemsByCuisineId = async (cuisineId) => {
  try {
    // Resolve cuisineId if it's not a MongoDB ObjectId
    if (cuisineId && !mongoose.Types.ObjectId.isValid(cuisineId)) {
      cuisineId = await resolveID(cuisineId, 'cuisine');
    }

    const fooditemObjects = await FooditemModel.find({
      cuisineId: cuisineId,
      isActive: true,
    });

    return fooditemObjects;
  } catch (err) {
    throw new Error(`Error while fetching fooditem: ${err.message}`);
  }
}

module.exports = {
  createFooditem,
  editFooditem,
  deleteFooditem,
  getFooditem,
  getAllFooditems,
  getFooditemsByCategoryId,
  getFooditemsByCuisineId,
};
