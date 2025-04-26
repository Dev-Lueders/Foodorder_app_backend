const mongoose = require('mongoose');

const fnd_mongo_id = async (_id, Model) => {
    try {
        if (!_id || !Model) {
            throw new Error(" need a Valid _id or Model")
        }
        const docs = await Model.find({ _id }).select("id");;

        if (!docs || docs.length === 0) {
            console.log("Error fetching documents or no documents were found based on the '_id':", _id);
            return null;
        }
        return docs.map(doc => doc.id);
    } catch (error) {
        console.error(`Error in fnd_object_id:${error.message}`)
        return null;
    }
};
    
module.exports = fnd_mongo_id;