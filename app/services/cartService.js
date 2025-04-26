const cartRepository = require("../database/repositories/cartRepository")
const expressAsyncHandler = require("express-async-handler");

const createCart = expressAsyncHandler(async (req, res) => {
    try {
        const { id, userId, orderTotalPrice } = req.body;
        const result = await cartRepository.createCart(id, userId, orderTotalPrice);
        if (result) {
            res.status(201).json({
                message: "Cart creation was a Success",
            });
        } else {
            res.status(400);
            throw new Error(`Cart creation failed`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: " Error creating the Cart",
            error: err.message,
        });
    }
});

const editCart = expressAsyncHandler(async (req, res) => {
    
    try {
        const cartId = req.params.id;
        const result = await cartRepository.editCart(cartId, req.body);

        if (result) {
            res.status(200).json({
                message: "a Cart was successfully edited",
            });
        } else {
            res.status(400);
            throw new Error(`Failed to edit the Cart`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({

            message: " Error editing the Cart Details",
            error: err.message,
        });
    }
});

const deleteCart = expressAsyncHandler(async (req, res) => {
    try {
        const cartId = req.params.id;
        const result = await cartRepository.deleteCart(cartId);

        if (result) {
            res.status(200).json({
                message: " Cart deletion was a success",
            });
        } else {
            res.status(400);
            throw new Error(`Cart deletion failed`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error deleting the Cart",
            error: err.message,
        });
    }
});

const getCart = expressAsyncHandler(async (req, res) => {
    try {
        const cartId = req.params.id;
        const result = await cartRepository.getCart(cartId);

        if (result) {
            res.status(200).json({
                data: result,
                message: " Fetched the Cart details successfully ",
            });
        } else {
            res.status(204);
            throw new Error(
                `Not able to find the Cart based on the Cart id: ${cartId}`
            );
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: " Error feting the Cart Details",
            error: err.message,
        });
    }
});

const getAllCarts = expressAsyncHandler(async (req, res) => {
    try {
        const result = await cartRepository.getAllCarts();
        res.status(200).json({
            data: result,
            message: "Retrieved all Carts successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error fetching Carts",
            error: err.message,
        });
    }
});

module.exports = {
    getAllCarts,
    getCart,
    createCart,
    editCart,
    deleteCart,
};