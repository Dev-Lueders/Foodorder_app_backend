const mongoose = require("mongoose");

const fnd_custom_id = require("./fnd_custom_Id");
const fnd_mongo_id = require("./fnd_mongo_id");


const resolveID = async (value, Model) => {
    if (!value || !Model) {
        throw new Error(" A valid id/_id Must be provided");
    }
    if (mongoose.Types.ObjectId.isValid(value)) {
        return await fnd_mongo_id(value, Model);
    } else {
        return await fnd_custom_id(value, Model);
    }
};
module.exports = resolveID;