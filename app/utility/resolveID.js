const mongoose = require("mongoose");

// Map of known ID fields to their models
const modelMap = {
  categoryId: require("../models/Category"),
  cuisineId: require("../models/Cuisine"),
  restaurantId: require("../models/Restaurant"),
  menuId: require("../models/Menu"),
    userId: require("../models/User"),
  fooditemId: require("../models/Fooditem"),
  menuitemId: require("../models/Menuitem"),
  
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