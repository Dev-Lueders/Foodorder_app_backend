const Custom2MongoID = async (doc) => {
  const transformed = { ...doc }; // raw object, or doc._doc

  for (const key of Object.keys(transformed)) {
    if (key.endsWith("Id") && typeof transformed[key] === "string" && !mongoose.Types.ObjectId.isValid(transformed[key])) {
      const modelName = key.replace("Id", "").toLowerCase(); // e.g. userId ➝ user
      try {
        const Model = require(path.join("../models", `${modelName}Model.js`));
        const record = await Model.findOne({ id: transformed[key] }).select("_id");
        if (record) {
          transformed[key] = record._id.toString();
        }
      } catch (err) {
        console.error(`Could not resolve model for key '${key}':`, err.message);
        // skip silently
      }
    }
  }

  return transformed;
};

module.exports = Custom2MongoID;