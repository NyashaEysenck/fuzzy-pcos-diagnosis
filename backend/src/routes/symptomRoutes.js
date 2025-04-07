const express = require('express');
const symptomController = require('../controllers/symptomController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes
router.route('/')
  .post(symptomController.createSymptom)
  .get(symptomController.getMySymptoms);

router.get('/date-range', symptomController.getSymptomsByDateRange);
router.get('/cycle-statistics', symptomController.getCycleStatistics);

router.route('/:id')
  .get(symptomController.getSymptom)
  .patch(symptomController.updateSymptom)
  .delete(symptomController.deleteSymptom);

module.exports = router;
