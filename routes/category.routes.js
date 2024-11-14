const router = require('express').Router();
const categoryControllers = require('../controllers/category.controllers');

// getCategories
router.get('/categories', categoryControllers.getCategories);
// postCategories
router.post('/categories', categoryControllers.createCategories)
// deleteCategory
router.delete("/categories/:id", categoryControllers.deleteCategory);


module.exports = router;