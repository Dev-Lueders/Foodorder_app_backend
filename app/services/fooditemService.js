const fooditemRepository = require("../database/repositories/fooditemRepository");
const expressAsyncHandler = require("express-async-handler");

const createFooditem = expressAsyncHandler(async (req, res) => {
  console.log("DEBUG req.body", req.body);
  /* COMPLETE TASK 1.a HERE */
  try {
    const { id, name, description, image, categoryId, cuisineId, isVeg } = req.body;
    const result = await fooditemRepository.createFooditem
      (id, name, description, image, categoryId, cuisineId, isVeg);
    
    if (result) {
      res.status(201).json({
        message: "Food item created successfully",

      });
    } else {
      res.status(400);
      throw new Error('Food Item creation failed');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json ({
      message: "Error creating category",
      error:err.message,
    })
  }
});

const editFooditem = expressAsyncHandler(async (req, res) => {
  /* COMPLETE TASK 1.b HERE */
  try {
    const fooditemId = req.params.id;
    const result = await fooditemRepository.editFooditem(fooditemId, req.body);

    if (result) {
      res.status(200).json({
        message: "Food Item has been edited successfully",
      });
    } else {
      res.status(400);
      throw new Error('Food Item edit failed');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting Food Item",
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
        message: "Food Item was deleted successfully",
      })
    } else {
      res.status(400);
      throw new Error('Food Item failed to delete');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: " Could not delete Food Item",
      error: err.message,
    })
    }
});

const getFooditem = expressAsyncHandler(async (req, res) => {
  /* COMPLETE TASK 1.d HERE */
  console.log("attempting to get fooditem with id:", req.params.id)
  try {
    const fooditemId = req.params.id;
    const result = await fooditemRepository.getFooditem(fooditemId);
  
  
  if (result) {
    res.status(200).json({
      data: result,
      message: "Retrieved Food Item details successfully",
    });
  } else {
    res.status(404);
    throw new Error(`No item Found based on the fooditemId 
    ${fooditemId}`
    );
  }
} catch (err) {
  console.error(err);
  res.status(500).json({
    message: "Error fetching Food Item",
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
      message: "Success received all food items",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching food items",
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
