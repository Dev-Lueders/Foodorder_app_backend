const mongoose = require('mongoose');
const ShippingModel = require("../../models/shippingModel");

const createShipping = async (
    id,
    shippingAddress,
    emailId,
) => {
    console.log("createShipping called with:", { id, shippingAddress, emailId });
    try {
        const newShipping = await ShippingModel.create({
            id: id,
            shippingAddress: shippingAddress,
            emailId: emailId,
        });
        console.log(" New shipping created:", newShipping);
        return newShipping;
    } catch (err) {
        console.error("Error in createShipping:", err);
        throw new Error(`Error while creating New Shipping Address:${err.message}`);
    }
};

const editShipping = async (shippingId, newData) => {
    console.log("editShipping called with:", { shippingId, newData });
    try {
        const shippingObject = await ShippingModel.findOne({_id: shippingId });
        console.log("Found shippingObject:", shippingObject);

        if (!shippingObject) {
            console.warn("Shipping object not found for ID:", shippingId);
            return null;
        }
        shippingObject.id = newData.id;
        shippingObject.shippingAddress = newData.shippingAddress;
        shippingObject.emailId = newData.emailId;
        shippingObject.phoneNo = newData.phoneNo || shippingObject.phoneNo;
        shippingObject.isActive = newData.isActive;
        
        const updatedShipping = await shippingObject.save();
        console.log("Updated shipping object save:", updatedShipping);
        
        return updatedShipping;
    } catch (err) {
        console.error("Error in editShipping:", err);
        throw new Error(`Error while editing shipping details: ${err.message}`);
    }
};

const deleteShipping = async (shippingId) => {
    console.log(" deleteShipping called with ID:", shippingId);
    try {
        const shippingObject = await ShippingModel.findById(shippingId);
        console.log("Found shipping object to delete", shippingObject);

        if (!shippingObject) {
            console.warn("Shipping object not found to delete with ID:", shippingId);
            return null;
        }
        shippingObject.isActive = false;
        const updatedShipping = await shippingObject.save();
        console.log("Shipping marked inactive:", updatedShipping);
        return updatedShipping;
    } catch (err) {
        console.error("Error in deleteShipping:", err);
        throw new Error(`Error while deleting Shipping Details: ${err.message}`);
    }
};

const getShipping = async (shippingId) => {
    console.log(" Second get Shipping called with ID:", shippingId);
    try {
        const shippingObject = await ShippingModel.findOne({
            _id: shippingId
        });
        console.log(" Third Shipping object found:", shippingObject);

        return shippingObject;
    } catch (err) {
        console.error("Error in getShipping:", err);
        throw new Error(`Error while fetching Shipping Details: ${err.message}`);
    }
};

const getAllShipping = async () => {
    console.log("from repository get All Shipping called");
    try {
       
        const shippingObject = await ShippingModel.find({ isActive: true });
        console.log(" From Repository All active shipping objects:", shippingObject);
        return shippingObject;
    } catch (err) {
        console.error("Error in getAllShipping:", err);
        throw new Error(`Error while fetching all Shipping Details: ${err.message}`);
    }
};

module.exports = {
    getAllShipping,
    getShipping,
    createShipping,
    editShipping,
    deleteShipping,
}