const fooditemRepository = require("../database/repositories/fooditemRepository");
const expressAsyncHandler = require("express-async-handler");

const createFooditem = expressAsyncHandler(async (req, res) => {
  /* COMPLETE TASK 1.a HERE */
  try {
    const { name, description, image, categoryId, cuisineId, isVeg } = req.body;
    const result = await fooditemRepository.createFooditem(name, description, image, categoryId, cuisineId, isVeg);

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
  /* COMPLETE TASK 1.b HERE */
  try {
    const fooditemId = req.params.id;
    const result = await fooditemRepository.editfooditems(fooditemId, req.body);

    if (result) {
      res.status(200).json({
        message: "Food Item successfully edited",
      });
    } else {
      res.status(400);
      throw new Error(`Failed to edit Food Item`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to edit Food Item details",
      error: err.message,
    });
  }
});

const deleteFooditem = expressAsyncHandler(async (req, res) => {
  /* COMPLETE TASK 1.c HERE */
  try {
    const fooditemId = req.params.id;
    const result = await fooditemRepository.deleteFooditem(fooditemId);

    if (result) {
      res.status(200).json({
        message: " Successfully deleted Food Item",
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
    const fooditemId = req.params.id;
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
