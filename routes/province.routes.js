const router = require('express').Router();
const provinceControllers = require('../controllers/province.controllers')

// getCategories
router.get('/provinces', provinceControllers.getProvinces);
// postCategories
router.post('/provinces', provinceControllers.createProvinces)
// deleteCategory
router.delete("/provinces/:id", provinceControllers.deleteProvince);


module.exports = router;