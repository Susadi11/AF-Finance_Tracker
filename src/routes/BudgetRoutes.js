const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/BudgetController");

router.post('/budgets', budgetController.createBudget);

router.get('/budgets', budgetController.getAllBudgets);

router.get('/budgets/:id', budgetController.getBudgetById);

router.put('/budgets/:id', budgetController.updateBudget);

router.delete('/budgets/:id', budgetController.deleteBudget);

module.exports = router;