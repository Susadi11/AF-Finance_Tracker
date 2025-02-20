const express = require("express");
const router = express.Router();
const goalController = require("../controllers/GoalController");

router.post('/goals', goalController.createGoal);

router.get('/goals', goalController.getAllGoals);

router.get('/goals/:id', goalController.getGoalById);

router.put('/goals/:id', goalController.updateGoal);

router.delete('/goals/:id', goalController.deleteGoal);

module.exports = router;