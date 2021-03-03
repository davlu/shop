import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler"; //so u dont have to try catch every single fking time

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1; //will have ?pageNumber=3 in URL
  //.query gets the ?blah part in url
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, //get ANYTHING related to substring. iph gives iphone, etc.
          $options: "i", //case insensitive
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword }); //total # of documents
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3); //sort by rating ascending
  res.json(products);
});

const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//DELETE product by id, DELETE /products/:id, Private admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Successfully Deleted Product" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//CREATE product, POST /products, Private admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//UPDATE a product by ID, POST /products/:id, Private admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    image,
    brand,
    category,
    countInStock,
    description,
  } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.image = image;
    product.description = description;
    product.category = category;
    product.brand = brand;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

//CREATE review, POST /products/:id/reviews, Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id); //url
  if (product) {
    //already review check
    if (
      product.reviews.find((r) => r.user.toString() === req.user._id.toString())
    ) {
      res.status(400);
      throw new Error("Product already reviewed");
    }
    const review = {
      name: req.user.name, //logged in user
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review Added" }); //new resource created
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getProducts,
  getProductByID,
  getTopProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
};
