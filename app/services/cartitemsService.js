const cartitemsRepository = require("../database/repositories/cartitemsRepository");
const expressAsyncHandler = require("express-async-handler");

const createCartitems = expressAsyncHandler(async (req, res) => {
    try {
        const { id, fooditemId, fooditemPrice, cartId, userId, isActive } = req.body;
        const result = await cartitemsRepository.createCartitems(id, fooditemId, fooditemPrice, cartId, userId, isActive);

        if (result) {
            res.status(201).json({
                message: "Cart Items creation was a success"
            });
        } else {
            res.status(400);
            throw new Error(`Cart Items creation failed`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error creating Cart Item",
            error: err.message,
        });
    }
})
const editCartitems = expressAsyncHandler(async (req, res) => {
    try {
        const cartitemsId = req.params.id;
        const result = await cartitemsRepository.editCartitems(cartitemsId, req.body);

        if (result) {
            res.status(200).json({
                message: "Cart Item edited successfully",
            });
        } else {
            res.status(400);
            throw new Error(`Editing Cart Item Failed`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error editing Cart Item details",
            error: err.message,
        });
    }
});

const deleteCartitems = expressAsyncHandler(async (req, res) => {
    try {
        const cartitemsId = req.params.id;
        const result = await cartitemsRepository.deleteCartitems(cartitemsId);

        if (result) {
            res.status(200).json({
                message: "Cart Items deleted Successfully",
            });
        } else {
            res.status(400);
            throw new Error(` Cart Items deletion Failed`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: " Error deleting Cart Item",
            error: err.message,
        });
    }
});

const getCartitems = expressAsyncHandler(async (req, res) => {
    try {
        const cartitemsId = req.params.id;
        const result = await cartitemsRepository.getCartitems(cartitemsId);
    
        if (result) {
            res.status(200).json({
                data: result,
                message: "Successfully fetched Cart Item details.",
            })
        } else {
            res.status(204);
            throw new Error(
                ` Not able to find the Cart Item based on the Cart Item id: ${cartitemsId}`
            );
        }
    } catch (err) {
        res.status(500).json({
            message: "Error fetching cart item details",
            error: err.message,
        });
    }
});

const getAllCartitems = expressAsyncHandler(async (req, res) => {
    try {
        const result = await cartitemsRepository.getAllCartitems();
        res.status(200).json({
            data: result,
            message: "Successfully fetched all Cart Items",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: " Error fetching Cart Items",
            error: err.message,
        });
    }
});

module.exports = {
  
        getAllCartitems,
        getCartitems,
        editCartitems,
        createCartitems,
        deleteCartitems,
};