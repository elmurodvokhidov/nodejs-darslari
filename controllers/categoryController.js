const Joi = require("joi");
const Category = require("../model/categoryModel");

const getAllCategoryFunc = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
};
const getOneCategoryFunc = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findById(id);
        if (!category) return res.status(404).send("Kategoriya topilmadi!");
        res.status(200).send(category);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
};
const createNewCategoryFunc = async (req, res) => {
    try {
        const { error } = validateFunction(req.body);
        if (error) return res.status(400).send(error);

        const newCategory = await new Category(req.body);
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
};
const updateCategoryFunc = async (req, res) => {
    try {
        const { error } = validateFunction(req.body);
        if (error) return res.status(400).send(error);

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateCategoryFunc) return res.status(404).json("Kategoriya topilmadi!");

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
};
const deleteCategoryFunc = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) return res.status(404).json("Kategoriya topilmadi!");

        res.status(200).json(deletedCategory);
    } catch (error) {
        console.log(error.message);
        res.status(500).json(error.message);
    }
};

// Validate funksiyasi
const validateFunction = (category) => {
    // Validate schema - sxemada obyektni qanday xossalari bo’lishi kerakligi va o’sha xossalarni turlari qanaqa bo’lishi, xossani qiymati eng kamida qancha bo’lishi yoki eng uzog’i bilan qancha bo’lishi ko'rsatib o'tiladi.
    const schema = Joi.object({
        nomi: Joi.string().required().min(3).max(15),
    });

    // Validatsiya natijasini funksiyaga qaytarish
    return schema.validate(category);
};

module.exports = {
    getAllCategoryFunc,
    getOneCategoryFunc,
    createNewCategoryFunc,
    updateCategoryFunc,
    deleteCategoryFunc,
};