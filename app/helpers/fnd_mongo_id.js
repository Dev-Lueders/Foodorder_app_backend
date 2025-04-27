const mongoose = require('mongoose');

const category = require("../models/categoryModel");
const cuisine = require("../models/cuisineModel");

const fnd_mongo_id = async (_id, Model) => {
    console.log("fnd_Mongo_id: ", _id)
    console.log("fnd_Mongo_id  Model: ", Model)
    try {
        if (!_id || !Model) {
    console.log("fnd_Mongo_id: ", _id)
    console.log("fnd_Mongo Model: ", Model)
        throw new Error(" need a Valid _id or Model")
        }
        const docs = await Model.find({ _id }).select("id");;

        if (!docs || docs.length === 0) {
    console.log("fnd_Mongo_id: ", _id)
    console.log("fnd_Mongo Model: ", Model)
    console.log("Error fetching documents or no documents were found based on the '_id':", _id);
            return null;
        }
        return docs.map(doc => doc.id);
    } catch (error) {
    console.log("fnd_Mongo_id", _id)
    console.log("fnd_Mongo_id Model: ", Model)
    console.error(`Error in fnd_object_id:${error.message}`)
        return null;
    }
};
    
module.exports = fnd_mongo_id;