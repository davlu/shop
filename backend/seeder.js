import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

//this is completely separate from our server,
//ust wanna populate DB
dotenv.config();
connectDB();
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users); //passing our users into User
    const adminUser = createdUsers[0]._id; //admin is our first user
    const sampleProds = products.map((product) => {
      return { ...product, user: adminUser }; //additional user field
    });
    await Product.insertMany(sampleProds); //passing our prods into Product
    console.log("Data imported!");
    process.exit();
  } catch (error) {
    console.error(`YOU FUCKED UP! ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.error(`YOU FUCKED UP! ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
