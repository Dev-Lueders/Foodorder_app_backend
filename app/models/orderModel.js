const mongoose = require("mongoose");

const FooditemSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  fooditemId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdTs: {
    type: Date,
    default: new Date(),
  },
  updatedTs: {
    type: Date,
    default: new Date(),
  }
});

const ShippingDetailsSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  address: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdTs: {
    type: Date,
    default: new Date(),
  },
  updatedTs: {
    type: Date,
    default: new Date(),
  }

  
});

const orderSchema = mongoose.Schema({
  id: {
        type: mongoose.Schema.Types.ObjectId,
    requires: true,  
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
   orderTotalPrice: {
    type: Number,
    required: true,
  },
    shippingDetails: {
    type: Object,
    required: true
  },
    status: {
    type: String,
    default: "PROCESSING",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdTs: {
    type: Date,
    default: new Date(),
  },
  updatedTs: {
    type: Date,
    default: new Date(),
  },
  fooditems: {
    type: Object,
    required: true
  },
});

const OrderModel = mongoose.model("Orders", orderSchema);

module.exports = OrderModel;
