const express = require("express");
const { auth, isAdmin } = require("../middleware/authenticationHandler");
const cartRouter = express.Router();

const {
    createCart,
    editCart,
    deleteCart,
    getCart,
    getAllCarts
} = require("../services/cartService");

cartRouter.route("/").post(auth, isAdmin, createCart);
cartRouter.route("/:id").put(auth, isAdmin, editCart);
cartRouter.route("/:id").delete(auth, isAdmin, deleteCart);
cartRouter.route("/:id").get(getCart);
cartRouter.route("/").get(getAllCarts);

module.exports =  cartRouter