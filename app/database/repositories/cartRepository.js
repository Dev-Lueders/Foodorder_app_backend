const CartModel = require("../../models/cartModel");

const createCart = async (
    id,
    userId,
    orderTotalPrice,
) => {
    try {
        const newCart = await CartModel.create({
            id: id,
            userId: userId,
            orderTotalPrice: orderTotalPrice,
        });
        return newCart;
    } catch (err) {
        throw new Error(`Error while creating a New Cart: ${err.message}`);
    }
};

const editCart = async (cartId, newData) => {
    try {
        const cartObject = await CartModel.findOne({
            _id: cartId
        });
        if (!cartObject) {
            return null;
        }
        cartObject.id = newData.id;
        cartObject.userId = newData.userId;
        cartObject.orderTotalPrice = newData.orderTotalPrice;
        cartObject.isActive = newData.isActive;
        cartObject.restaurantId = newData.restaurantId;
        const updatedCart = await cartObject.save();
        return updatedCart;
    } catch (err) {
        throw new Error(`Error while editing Cart: ${err.message}`);
    }
};

const deleteCart = async (cartId) => {

    try {
        const cartObject = await CartModel.findById(cartId);

        if (!cartObject) {
            return null;
        }
        cartObject.isActive = false;
        const updatedCart = await cartObject.save();
        return updatedCart;
    } catch (err) {
        throw new Error(`Error while deleting Cart: ${err.message}`);
    }
};


const getCart = async (cartId) => {
    try {
        const cartObject = await CartModel.findOne({
            _id: cartId
        });
        return cartObject;
    } catch (err) {
        throw new Error(`Error while fetching a Cart: ${err.message}`);
    }
};

const getAllCarts = async () => {
    try {
        const carts = await CartModel.find({ isActive: true });
        return carts;
    } catch (err) {
        throw new Error(`Error fetching Carts: ${err.message}`);
    }
};

const getCartByUsersId = async (userId) => {

    try {
        const cartObject = await CartModel.findOne({
            userId: userId,
            isActive: true,
        });
        return cartObject;
    } catch (err) {
        throw new Error(`Error while fetching Cart for user ${userId}: ${err.message}`);
    }
}

module.exports = {

    createCart,
    editCart,
    deleteCart,
    getCart,
    getAllCarts,
    getCartByUsersId,
}