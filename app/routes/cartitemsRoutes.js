const express = require("express");
const { auth, isAdmin } = require("../middleware/authenticationHandler");
const cartitemsRouter = express.Router();

const {
    createCartitems,
    editCartitems,
    deleteCartitems,
    getCartitems,
    getAllCartitems
} = require("../services/cartitemsService");

cartitemsRouter.route("/").post(auth, isAdmin, createCartitems);
cartitemsRouter.route("/:id").put(auth, isAdmin, editCartitems);
cartitemsRouter.route("/:id").delete(auth, isAdmin, deleteCartitems);
cartitemsRouter.route("/:id").get(getCartitems);
cartitemsRouter.route("/").get(getAllCartitems);

module.exports =  cartitemsRouter