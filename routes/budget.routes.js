const router = require('express').Router();
const budgetControllers = require('../controllers/budget.controllers');


router.get('/budget', budgetControllers.getBudget);

router.post('/budget', budgetControllers.createBudget)

router.delete("/budget/:id", budgetControllers.deleteBudget);


module.exports = router;