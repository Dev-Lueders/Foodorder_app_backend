const mongoose = require("mongoose");


const modelMap = {
  categoryId: require("../models/categoryModel"),
  cuisineId: require("../models/cuisineModel"),
  restaurantId: require("../models/restaurantModel"),                      // Map of known ID fields to their models
  menuId: require("../models/menuModel"),
    userId: require("../models/userModel"),
  fooditemId: require("../models/fooditemModel"),
  menuitemId: require("../models/menuitemModel"),
  shippingId: require("../models/shippingModel"),
  cartsId: require("../models/cartModel"),
  cartitemsId: require("../models/cartitemsModel"),

  
};

const resolveReferenceIDs = async (dataObj = {}) => {
  const resolved = { ...dataObj };

  for (const [key, value] of Object.entries(dataObj)) {
    if (modelMap[key]) {
      const Model = modelMap[key];

      if (mongoose.Types.ObjectId.isValid(value)) {
                                                        
        resolved[key] = value;
      } else {
        const doc = await Model.findOne({ id: value });
        resolved[key] = doc ? doc.id : null;
      }
    }
  }

  return resolved;
};

module.exports = resolveReferenceIDs;