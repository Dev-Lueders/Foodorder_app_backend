const express = require("express");
const { auth, isAdmin } = require("../middleware/authenticationHandler");
const shippingRouter = express.Router();

const {
    createShipping,
    editShipping,
    deleteShipping,
    getShipping,
    getAllShipping
} = require("../services/shippingService");

shippingRouter.route("/").post(auth, isAdmin, createShipping);
shippingRouter.route("/:id").put(auth, isAdmin, editShipping);
shippingRouter.route("/:id").delete(auth, isAdmin, deleteShipping);
shippingRouter.route("/:id").get(getShipping);
shippingRouter.route("/").get(getAllShipping);

module.exports =  shippingRouter