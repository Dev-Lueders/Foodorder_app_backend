const mongoose = require('mongoose');
const shippingRepository = require("../database/repositories/shippingRepository");

const expressAsyncHandler = require("express-async-handler");

const createShipping = expressAsyncHandler(async (req, res) => {
    console.log("createShipping function started");
    try {
        console.log("Request body received for createShipping:", req.body);
        const { id, shippingAddress, emailId } = req.body;
        console.log("Extracted data from request body:", { id, shippingAddress, emailId });
        console.log("Calling shippingRepository.createShipping...");
        const result = await shippingRepository.createShipping(id, shippingAddress, emailId);

        console.log("Result from shippingRepository.createShipping:", result);
        if (result) {
            console.log("Shipping Address created successfully:", result);
            res.status(201).json({
                message: " Shipping Address successfully created",
            });
        } else {
            console.log("Shipping Address creation failed: No result returned");
            res.status(400);
            throw new Error(`Shipping Address creation failed`);
        }
    } catch (err) {
        console.error("Error occurred in createShipping:", err);
        console.error(err);
        res.status(500).json({
            message: " Error creating Shipping Address",
            error: err.message,
        });
    }
});


const editShipping = expressAsyncHandler(async (req, res) => {
    console.log("editShipping function started");
    try {
        console.log("Received request to edit shipping address with shippingId:", req.params.id);
        console.log("Request body for new data to update:", req.body);
        const shippingId = req.params.id;
        console.log("Shipping ID to edit:", shippingId);
        
        console.log("Calling shippingRepository.editShipping...");
        const result = await shippingRepository.editShipping(shippingId, req.body);
console.log("Result from shippingRepository.editShipping:", result);
        if (result) {
            console.log("Shipping Address edited successfully:", result);
            res.status(200).json({
                message: "Shipping Address was edited successfully",
            });
        } else {
            console.log("Editing Shipping Address failed: No result returned");
            res.status(400);
            throw new Error(`Editing Shipping Address Failed`);
        }
    } catch (err) {
        console.error("Error occurred in editShipping:", err);
        console.error(err);
        res.status(500).json({
            message: "Error editing Shipping Address",
            error: err.message,
        });
    }
});

const deleteShipping = expressAsyncHandler(async (req, res) => {
    console.log("deleteShipping function started");
    try {
        const shippingId = req.params.id;
         console.log("Shipping ID to delete:", shippingId);

        console.log("Calling shippingRepository.deleteShipping...");
        const result = await shippingRepository.deleteShipping(shippingId);
console.log("Result from shippingRepository.deleteShipping:", result);
        if (result) {
            res.status(200).json({
                message: "Shipping Address deleted successfully",
            });
        } else {
            console.log("Failed to delete Shipping Address: No result returned");
            res.status(400);
            throw new Error(`Failed to delete Shipping Address`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error deleting Shipping Address",
            error: err.message,
        });
    }
});

const getShipping = expressAsyncHandler(async (req, res) => {
    console.log("get shipping function started")
    try {
        const shippingId = req.params.id;
        const result = await shippingRepository.getShipping(shippingId);

        if (result) {
            res.status(200).json({
                data: result,
                message: "Shipping Details were fetched successfully",
            });
        } else {
            res.status(204);
            throw new Error(
                `No Shipping Address found based on the shippingId${shippingId}`
            );
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: " Error fetching Shipping Details",
            error: err.message,
        });
    }
});

const getAllShipping = expressAsyncHandler(async (req, res) => {
    console.log(" from service connected to DB:", mongoose.connection.name);
    console.log("from service get all shipping called ")
    try {
        console.log("from service Query Executed: finding({isActive:true")
        const result = await shippingRepository.getAllShipping();
        
        res.status(200).json({
            data: result,
            message: " Shipping Addresses fetched was a success from service",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching Shipping Address",
            error: err.message,
        });
    }
});

module.exports = {
    getAllShipping,
    getShipping,
    createShipping,
    editShipping,
    deleteShipping,
};