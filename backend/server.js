import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; //middleware for error handling

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB(); //connect to the DB

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //gives http methods logging
}
app.use(express.json()); //allows us accept json data in body

app.use("/products", productRoutes); //anything with this prefix
app.use("/users", userRoutes); //anything with this prefix
app.use("/orders", orderRoutes); //anything with this prefix will be route through orderRoutes
app.use("/upload", uploadRoutes);
app.get("/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); //make uploads folder static

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.join.resolve(__dirname, "frontend", "build", "index.html")
    )
  ); //* is anything that isnt in app.use routes. default index.html show.
} else {
  app.get("/", (req, res) => {
    res.send("API RUNNING");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV;
app.listen(
  PORT,
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`)
);
