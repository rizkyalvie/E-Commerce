const express = require("express");

const router = express.Router();

const { addUser, getUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const { getProduct, addProduct, getDetailProduct, updateProduct, deleteProduct } = require("../controllers/product");
const { getTransaction, buyProduct, notification } = require("../controllers/transaction");
const { register, login, checkAuth } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");
const { getCategories, getCategory, addCategory, updateCategory, deleteCategory } = require("../controllers/category")
const { getProfile, updateProfile } = require("../controllers/profile");
const { uploadFile } = require("../middlewares/uploadFile");

// Products
router.get("/products", getProduct);
router.get("/product/:id", auth, getDetailProduct);
router.post("/addproduct", auth, uploadFile("image"), addProduct)
router.patch("/product/:id", auth, uploadFile("image"), updateProduct)
router.delete("/product/:id", auth, deleteProduct);
// Categories


// Transaction
router.get("/transactions", auth, getTransaction);
router.post("/transaction", auth, buyProduct);

// Login & Register
router.post("/register", register);
router.post("/login", login);
router.get("/check-auth", auth, checkAuth)

// Profile
router.patch("/profile/:id", auth, uploadFile("image"), updateProfile)
router.get("/profile/:id", auth, getProfile)

// Users
router.post('/user', addUser)
router.get('/user', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

// Category
router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.post("/category/:id", addCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

// Notification
router.post("/notification", notification);

module.exports = router;
