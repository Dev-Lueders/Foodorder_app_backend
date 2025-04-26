 const mongoose = require('mongoose'); 

const FooditemModel = require("../../models/fooditemModel");

const createFooditem = async (id, name, description, image, categoryId, cuisineId, isVeg,isActive) => {
  try {
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


const editFooditem = async (fooditemId, newData) => {
  try {
    const query = {
      _id: new mongoose.Types.ObjectId(fooditemId),
      
    };

    const fooditemObject = await FooditemModel.findOne(query);
    
    if (!fooditemObject) {
      return null;
    }
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

const getFooditem = async (fooditemId) => {
  try {
    
    const fooditemObject = await FooditemModel.findOne(
      {
        _id: fooditemId,
        isActive: true
      })
    
    return fooditemObject;
  } catch (err) {
    throw new Error(`Error while fetching Food Item: ${err.message}`);
  }
};

const getAllFooditems = async () => {
  try {
    const fooditems = await FooditemModel.find({ isActive: true });
    return fooditems;
  } catch (err) {
    throw new Error(`Error while fetching Food Items: ${err.message}`);
  }
};

const getFooditemsByCuisineId = async(cuisineId) => {
  try {
    const fooditemObjects = await FooditemModel.find({
      cuisineId: cuisineId,
      isActive: true,
    });
    return fooditemObjects;
  } catch (err) {
    throw new Error(`Error while fetching fooditem: ${err.message}`);
  }
}

const getFooditemsByCategoryId = async(categoryId) => {
  try {
    const fooditemObjects = await FooditemModel.find({
      categoryId: categoryId,
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
  getFooditemsByCuisineId,
  getFooditemsByCategoryId,
};
