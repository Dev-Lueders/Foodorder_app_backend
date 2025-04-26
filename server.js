const express = require("express");


const connectDatabase = require("./app/database/databaseInit");
const { SERVER_PORT } = require("./app/constants");
const errorHandler = require("./app/middleware/errorHandlers");

const categoryRouter = require("./app/routes/categoryRoutes");
const userRouter = require("./app/routes/userRoutes");
const cuisineRouter = require("./app/routes/cuisineRoutes");
const fooditemRouter = require("./app/routes/fooditemRoutes");
const restaurantRouter = require("./app/routes/restaurantRoutes");
const menuRouter = require("./app/routes/menuRoutes");
const orderRouter = require("./app/routes/orderRoutes");
const shippingRouter = require("./app/routes/shippingRoutes");
const cartRouter = require("./app/routes/cartRoutes");
const cartitems = require("./app/routes/cartitemsRoutes");

const app = express();

var cors = require("cors");

app.use(cors());

connectDatabase();

app.use(express.json());
app.use(errorHandler);

var requestBodyParser = require("body-parser");
const cartitemsRouter = require("./app/routes/cartitemsRoutes");

app.use(requestBodyParser.json({ limit: "5mb" }));
app.use(
  requestBodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cuisines", cuisineRouter);
app.use("/api/v1/fooditems", fooditemRouter);
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/menus", menuRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/cartitems", cartitemsRouter);
app.use("/api/v1/shipping", shippingRouter)
app.get("/PING", (_, res) => {
  res.status(200).json({
    message: "PONG",
  });
});
console.log('Server is running!');
app.listen(SERVER_PORT, () => {
  
  console.log(`Server is running at port : ${SERVER_PORT}`);

});
