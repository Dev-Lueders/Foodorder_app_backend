const mongoose = require("mongoose");

const FooditemSchema = mongoose.Schema({
  // orderId: {
  //   type: String,
  //   required: true,
  // },
  fooditemId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  // },
  // isActive: {
  //   type: Boolean,
  //   default: true,
  // },
  // createdTs: {
  //   type: Date,
  //   default: new Date(),
  // },
  // updatedTs: {
  //   type: Date,
  //   default: new Date(),
}
});

const ShippingDetailsSchema = mongoose.Schema({
  // id: {
  //   type: string,
  // },
  address: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
   },
  emailId: {
    type: String,
    required: true,
  },
  
  // isActive: {
  //   type: Boolean,
  //   default: true,
  // },
  // createdTs: {
  //   type: Date,
  //   default: new Date(),
  // },
  // updatedTs: {
  //   type: Date,
  //   default: new Date(),
  // }

  
});

const orderSchema = mongoose.Schema({
  // id: {
  //       type: string,
  //   requires: true,  
  // },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: String,
    default: "PROCESSING",
  },

   orderTotalPrice: {
    type: Number,
    required: true,
  },
   fooditems: {
    type: Object,
    required: true
  },
   
    shippingDetails: {
      type: mongoose.Types.ObjectId,
      ref:"shippingdetails",
    required: true
  },
  
  isActive: {
    type: Boolean,
    default: true,
  },
  createdTs: {
    type: Date,
    default: Date.now,
  },
  updatedTs: {
    type: Date,
    default: Date.now,
  },
  
});

const OrderModel = mongoose.model("Orders", orderSchema);

module.exports = OrderModel;
