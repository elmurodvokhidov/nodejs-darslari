const express = require("express");
const {
    getAllCategoryFunc,
    getOneCategoryFunc,
    createNewCategoryFunc,
    updateCategoryFunc,
    deleteCategoryFunc
} = require("../controllers/categoryController");
const router = express.Router();

router.get("/", getAllCategoryFunc);
router.get("/:id", getOneCategoryFunc);
router.post("/", createNewCategoryFunc);
router.put("/:id", updateCategoryFunc);
router.delete("/:id", deleteCategoryFunc);

module.exports = router;