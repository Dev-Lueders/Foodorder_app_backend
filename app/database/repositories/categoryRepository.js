const CategoryModel = require("../../models/categoryModel");

const createCategory = async (
  id,
  name,
  description,
  image
) => {
  try {
    const newCategory = await CategoryModel.create({
      id: id,
      name: name,
      description: description,
      image: image
    });
    return newCategory;
  } catch (err) {
    throw new Error(`Error while creating category: ${err.message}`);
  }
};

const editCategory = async (categoryId, newData) => {
  try {
    const categoryObject = await CategoryModel.findOne({
        _id: categoryId 
      });

    if (!categoryObject) {
      return null;
    }
    categoryObject.id = newData.id;
    categoryObject.name = newData.name;
    categoryObject.description = newData.description;
    categoryObject.image = newData.image;
    categoryObject.isActive = newData.isActive;

    const updatedCategory = await categoryObject.save();
    return updatedCategory;
  } catch (err) {
    throw new Error(`Error while editing category: ${err.message}`);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const categoryObject = await CategoryModel.findById(categoryId);

    if (!categoryObject) {
      return null;
    }

    categoryObject.isActive = false;
    const updatedCategory = await categoryObject.save();
    return updatedCategory;
  } catch (err) {
    throw new Error(`Error while deleting category: ${err.message}`);
  }
};

const getCategory = async (categoryId) => {
  try {
    const categoryObject = await CategoryModel.findOne({
      _id: categoryId
      
    });
    
    return categoryObject;
  } catch (err) {
    throw new Error(`Error while fetching category: ${err.message}`);
  }
};

const getAllCategories = async () => {
  try {
    const categories = await CategoryModel.find({ isActive: true });
    return categories;
  } catch (err) {
    throw new Error(`Error while fetching categories: ${err.message}`);
  }
};

const getCategoryIdByName = async (categoryName) => {
  try {
    const categoryObject = await CategoryModel.findOne({
      name: categoryName,
      isActive: true,
    });
    return categoryObject.id;
  } catch (err) {
    throw new Error(`Error while fetching category: ${err.message}`);
  }
}
module.exports = {
  createCategory,
  editCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
  getCategoryIdByName,
};
