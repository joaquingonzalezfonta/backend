const router = require('express').Router();
const categoryControllers = require('../controllers/category.controllers');


router.get('/categories', categoryControllers.getCategories);

router.post('/categories', categoryControllers.createCategories)

router.delete("/categories/:id", categoryControllers.deleteCategory);


module.exports = router;