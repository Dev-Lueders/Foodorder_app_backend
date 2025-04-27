const mongoose = require("mongoose");

const fnd_custom_id = async (id, Model) => {
    console.log(id)
    console.log(Model)
    try {
        if (!id || !Model) {
            console.log("fnd_customid: ",id)
            console.log("fnd_customid Model:",Model)
         throw new Error(" Valid id or Model")
        }
        const docs = await Model.find({ id }).select("_id");;

        if (!docs || docs.length === 0) {
            console.log("Error fetching documents or no documents were found by 'id': ", id);
            return null;
        }
        return docs.map(doc => doc._id)[0];
    } catch (error) {
        console.log("fnd_customid: ", id)
        console.log("fnd_customid Model: ", Model)
        console.error(`Error in fnd_custom_id:${error.message}`)
    return null;
    }
    
};
    
module.exports = fnd_custom_id;