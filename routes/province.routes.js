const router = require('express').Router();
const provinceControllers = require('../controllers/province.controllers')


router.get('/provinces', provinceControllers.getProvinces);

router.post('/provinces', provinceControllers.createProvinces)

router.delete("/provinces/:id", provinceControllers.deleteProvince);


module.exports = router;