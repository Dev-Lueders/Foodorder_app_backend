
const path = require("path");
const mongoose = require('mongoose');

const Mongo2CustomID = async (doc) => {
  const transformed = { ...doc._doc }; // clone raw Mongoose doc

  for (const key of Object.keys(transformed)) {
    if (key.endsWith("Id") && mongoose.Types.ObjectId.isValid(transformed[key])) {
      const modelName = key.replace("Id", "");
      try {
        const Model = require(path.join("../models", `${modelName}Model.js`));
        const record = await Model.findById(transformed[key]).select("id");
        if (record) {
          transformed[key] = record.id;
        }
      } catch (err) {
        console.error(`Could not resolve model for key '${key}':`, err.message);
        // Fails silently so your API doesn't break.
      }
    }
  }

  return transformed;
};
module.exports = Mongo2CustomID;