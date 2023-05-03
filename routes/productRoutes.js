const express = require("express");
const { productController } = require("../controllers");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.get("/all", verifyToken, productController.fetchAllProduct);
router.get("/category", verifyToken, productController.fetchAllCategory);

module.exports = router;
