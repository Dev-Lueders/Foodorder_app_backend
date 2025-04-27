const mongoose = require('mongoose');
const fooditemRepository = require("../database/repositories/fooditemRepository");
const expressAsyncHandler = require("express-async-handler");
const resolveID = require("../helpers/resolveID");
const fooditemModel = require("../models/fooditemModel");
const categoryModel = require("../models/categoryModel");
const cuisineModel = require("../models/cuisineModel");

const createFooditem = expressAsyncHandler(async (req, res) => {
  /* COMPLETE TASK 1.a HERE */
  try {
    const { id, name, description, image, categoryId, cuisineId, isVeg, isActive } = req.body;

    // Resolve categoryId and cuisineId if they are not MongoDB ObjectIds
    let resolveCategoryId = categoryId;
    let resolveCuisineId = cuisineId;
    
    if (resolveCategoryId && !mongoose.Types.ObjectId.isValid(resolveCategoryId)) {
      resolveCategoryId = await resolveID(resolveCategoryId, categoryModel);
    }
    if (resolveCuisineId && !mongoose.Types.ObjectId.isValid(resolveCuisineId)) {
      resolveCuisineId = await resolveID(resolveCuisineId, cuisineModel);
    }

    const result = await fooditemRepository.createFooditem(id, name, description, image, resolveCategoryId, resolveCuisineId, isVeg, isActive);

    if (result) {
      res.status(201).json({
        message: "Food Item created was a success",
      });
    } else {
      res.status(400);
      throw new Error(`Food Item creation failed`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error creating Food Item",
      error: err.message,
    });
  }
});

const editFooditem = expressAsyncHandler(async (req, res) => {
  console.log("[editFooditem CONTROLLER] -- function entry");
  console.log(" req.params.id:", req.params.id);
  console.log(" req.body:", req.body);

  try {
    const fooditemId = req.params.id;
    console.log(" Calling repository.editFooditem with ID:", fooditemId);

    const newData = req.body;

    // Resolve categoryId and cuisineId if they are not MongoDB ObjectIds
    let resolveCategoryId = newData.categoryId;
    let resolveCuisineId = newData.cuisineId;

    if (resolveCategoryId && !mongoose.Types.ObjectId.isValid(resolveCategoryId)) {
      resolveCategoryId = await resolveID(resolveCategoryId, categoryModel);
    }
    if (resolveCuisineId && !mongoose.Types.ObjectId.isValid(resolveCuisineId)) {
      resolveCuisineId = await resolveID(resolveCuisineId, cuisineModel);
    }

    newData.categoryId = resolveCategoryId;
    newData.cuisineId = resolveCuisineId;

    const result = await fooditemRepository.editFooditem(fooditemId, newData);

    console.log(" repository.editFooditem result:", result);

    if (result) {
      res.status(200).json({
        message: "Food Item successfully edited",
      });
    } else {
      res.status(400);
      throw new Error(`Failed to edit Food Item`);
    }
  } catch (err) {
    console.error(" Error in CONTROLLER:", err);
    res.status(500).json({
      message: "Failed to edit Food Item details",
      error: err.message,
    });
  }
});

const deleteFooditem = expressAsyncHandler(async (req, res) => {
  /* COMPLETE TASK 1.c HERE */
  try {
    let fooditemId = req.params.id;
    
    // Resolve fooditemId if it's not a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(fooditemId)) {
      fooditemId = await resolveID(fooditemId, fooditemModel);
    }

    // Resolve categoryId and cuisineId if provided and not valid MongoDB ObjectIds
    let resolveCategoryId = req.body.categoryId;
    let resolveCuisineId = req.body.cuisineId;

    if (resolveCategoryId && !mongoose.Types.ObjectId.isValid(resolveCategoryId)) {
      resolveCategoryId = await resolveID(resolveCategoryId, categoryModel);
    }
    if (resolveCuisineId && !mongoose.Types.ObjectId.isValid(resolveCuisineId)) {
      resolveCuisineId = await resolveID(resolveCuisineId, cuisineModel);
    }

    const result = await fooditemRepository.deleteFooditem(fooditemId);

    if (result) {
      res.status(200).json({
        message: "Successfully deleted Food Item",
      });
    } else {
      res.status(400);
      throw new Error(`Failed to delete Food Item`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting Food Item",
      error: err.message,
    });
  }
});

const getFooditem = expressAsyncHandler(async (req, res) => {
  /* COMPLETE TASK 1.d HERE */
  try {
    let fooditemId = req.params.id;
    
    // Resolve fooditemId if it's not a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(fooditemId)) {
      fooditemId = await resolveID(fooditemId, fooditemModel);
    }

    // Resolve categoryId and cuisineId if provided and not valid MongoDB ObjectIds
    let resolveCategoryId = req.body.categoryId;
    let resolveCuisineId = req.body.cuisineId;

    if (resolveCategoryId && !mongoose.Types.ObjectId.isValid(resolveCategoryId)) {
      resolveCategoryId = await resolveID(resolveCategoryId, categoryModel);
    }
    if (resolveCuisineId && !mongoose.Types.ObjectId.isValid(resolveCuisineId)) {
      resolveCuisineId = await resolveID(resolveCuisineId, cuisineModel);
    }

    const result = await fooditemRepository.getFooditem(fooditemId);

    if (result) {
      res.status(200).json({
        data: result,
        message: "Fetched Food Items Successfully",
      });
    } else {
      res.status(204);
      throw new Error(
        `Not able to find the food Item based on the food Item id: ${fooditemId}`
      );
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error Fetching Food Item Details",
      error: err.message,
    });
  }
});

const getAllFooditems = expressAsyncHandler(async (req, res) => {
  /* COMPLETE TASK 1.e HERE */
  try {
    // Resolve categoryId and cuisineId if provided and not valid MongoDB ObjectIds
    let resolveCategoryId = req.body.categoryId;
    let resolveCuisineId = req.body.cuisineId;

    if (resolveCategoryId && !mongoose.Types.ObjectId.isValid(resolveCategoryId)) {
      resolveCategoryId = await resolveID(resolveCategoryId, categoryModel);
    }
    if (resolveCuisineId && !mongoose.Types.ObjectId.isValid(resolveCuisineId)) {
      resolveCuisineId = await resolveID(resolveCuisineId, cuisineModel);
    }

    const result = await fooditemRepository.getAllFooditems();
    res.status(200).json({
      data: result,
      message: "Fetched all Food Items Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching Food Items",
      error: err.message,
    });
  }
});

module.exports = {
  createFooditem,
  editFooditem,
  deleteFooditem,
  getFooditem,
  getAllFooditems,
};