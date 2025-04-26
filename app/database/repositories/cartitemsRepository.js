const CartitemsModel = require("../../models/cartitemsModel");

const createCartitems = async (
    id,
    fooditemId,
    fooditemPrice,
    userId,
    cartId,
    isActive,
) => {
    try {
        const newCartitem = await CartitemsModel.create({
            id: id,
            fooditemId: fooditemId,
            fooditemPrice: fooditemPrice,
            userId: userId,
            cartId: cartId,
            isActive: isActive,
        });
        return newCartitem;
    } catch (err) {
        throw new Error(`Error while creating a new cart item: ${err.message}`);
    }
};

const editCartitems = async (cartitemsId, newData) => {
    try {
        const cartitemsObject = await CartitemsModel.findOne({
            _id: cartitemsId
        });

        if (!cartitemsObject) {
            return null;
        }
        cartitemsObject.id = newData.id;
        cartitemsObject.fooditemId = newData.fooditemId;
        cartitemsObject.fooditemPrice = newData.fooditemPrice;
        cartitemsObject.unitsInCart = newData.unitsInCart;
        cartitemsObject.isActive = newData.isActive;

        const updatedCartitems = await cartitemsObject.save();
        return updatedCartitems;
    } catch (err) {
        throw new Error(`Error while editing Cart Item: ${err.message}`)
    }
};

const deleteCartitems = async (cartitemsId) => {
    try {
        const cartitemsObject = await CartitemsModel.findById(cartitemsId);
        if (!cartitemsObject) {
            return null;
        }
        cartitemsObject.isActive = false;
        const updatedCartitems = await cartitemsObject.save();
        return updatedCartitems;
    } catch (err) {
        throw new Error(`Error while deleting Cart Item: ${err.message}`);
    }
};


const getCartitems = async (cartitemsId) => {
    try {
        const cartitemsObject = await CartitemsModel.findOne({
            _id: cartitemsId
        });
        return cartitemsObject;
    } catch (err) {
        throw new Error(`Error while getting Cart Item By Id:${err.message}`);
    }
};


const getAllCartitems = async () => {
    try {
        const cartitems = await CartitemsModel.find({ isActive: true });
        return cartitems;
    } catch (err) {
        throw new Error(`Error fetching all Cart Items: ${err.message}`);
    }
};


module.exports = {
    getAllCartitems,
    getCartitems,
    createCartitems,
    editCartitems,
    deleteCartitems,

};