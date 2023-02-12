import express from "express";
const router = express.Router();

// Get all products
router.get("/", require("./controllers/products/getAllProducts").default);

// Get products by author
router.get("/author/:author", require("./controllers/products/getProductsByAuthor").default);

// Get products by category
router.get("/category/:category", require("./controllers/products/getProductsByCategory").default);

// Get single product
router.get("/:title", require("./controllers/products/getSingleProduct").default);

// Soft delete product
router.delete("/:title", require("./controllers/products/softDeleteProduct").default);

export default router;