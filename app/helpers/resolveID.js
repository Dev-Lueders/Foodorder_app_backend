const mongoose = require("mongoose");


const fnd_custom_id = require("./fnd_custom_Id");
const fnd_mongo_id = require("./fnd_mongo_id");
const resolveID = async (value, Model) => {
         console.log("Resolve Begin Value: ", value)
         console.log("Resolve Begin Model: ", Model)
    if (!value || !Model) {
        console.log("Resolve Model Value: ", value)
        console.log("Resolve Model Model: ", Model)
        throw new Error(" A valid id/_id Must be provided");
    }
    if (mongoose.Types.ObjectId.isValid(value)) {
        console.log("Resolve Mongoose Value: ", value)
        console.log("Resolve Mongoose Model: ", Model)
    return await fnd_mongo_id(value, Model);
    } else {
        console.log("Resolve Value: ", value)
        console.log("Resolve Model: ", Model)
    return await fnd_custom_id(value, Model);
    }
    
};
module.exports = resolveID;