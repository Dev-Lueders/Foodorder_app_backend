const CuisineModel = require("../../models/cuisineModel");

const createCuisine = async (id,name, description, image) => {
  try {
    const newCuisine = await CuisineModel.create({
      id: id,
      name: name,
      description: description,
      image: image
    });
    return newCuisine;
  } catch (err) {
    throw new Error(`Error while creating cuisine: ${err.message}`);
  }
};

const editCuisine = async (cuisineId, newData) => {
  try {
    const cuisineObject = await CuisineModel.findOne({
      _id: cuisineId,
     
    });

    if (!cuisineObject) {
      return null;
    }
    cuisineObject.id = newData.id;
    cuisineObject.name = newData.name;
    cuisineObject.description = newData.description;
    cuisineObject.image = newData.image;
    cuisineObject.isActive = newData.isActive;

    const updatedCuisine = await cuisineObject.save();
    return updatedCuisine;
  } catch (err) {
    throw new Error(`Error while editing cuisine: ${err.message}`);
  }
};

const deleteCuisine = async (cuisineId) => {
  try {
    const cuisineObject = await CuisineModel.findById(cuisineId);

    if (!cuisineObject) {
      return null;
    }

    cuisineObject.isActive = false;
    const updatedCuisine = await cuisineObject.save();
    return updatedCuisine;
  } catch (err) {
    throw new Error(`Error while deleting cuisine: ${err.message}`);
  }
};

const getCuisine = async (cuisineId) => {
  try {
    const cuisineObject = await CuisineModel.findOne({
      _id: cuisineId,
      isActive: true,
    });
    return cuisineObject;
  } catch (err) {
    throw new Error(`Error while fetching cuisine: ${err.message}`);
  }
};

const getAllCuisines = async () => {
  try {
    const cuisines = await CuisineModel.find({ isActive: true });
    console.log("Cuisines", cuisines)
    return cuisines;
  } catch (err) {
    throw new Error(`Error while fetching cuisines: ${err.message}`);
  }
};

const getCuisineIdByName = async (cuisineName) => {
  try {
    const cuisineObject = await CuisineModel.findOne({
      name: cuisineName,
      isActive: true,
    });
    return cuisineObject._id;
  } catch (err) {
    throw new Error(`Error while fetching cuisine: ${err.message}`);
  }
}
module.exports = {
  createCuisine,
  editCuisine,
  deleteCuisine,
  getCuisine,
  getAllCuisines,
  getCuisineIdByName,
};
