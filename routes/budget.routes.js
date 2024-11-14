const router = require('express').Router();
const budgetControllers = require('../controllers/budget.controllers');

// getBudget
router.get('/budget', budgetControllers.getBudget);
// postBudget
router.post('/budget', budgetControllers.createBudget)
// deleteBudget
router.delete("/budget/:id", budgetControllers.deleteBudget);


module.exports = router;