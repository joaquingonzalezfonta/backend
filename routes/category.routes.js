const router = require('express').Router();
const categoryController = require('../controllers/category.controllers');

// getCategories
router.get('/categories', categoryController.getCategories);
// postCategories
router.post('/categories', categoryController.createCategories)
// deleteCategories
// putCategories










module.exports = router;