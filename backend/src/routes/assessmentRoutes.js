const express = require('express');
const assessmentController = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes
router.route('/')
  .post(assessmentController.createAssessment)
  .get(assessmentController.getMyAssessments);

router.get('/latest', assessmentController.getLatestAssessment);
router.get('/date-range', assessmentController.getAssessmentsByDateRange);

router.route('/:id')
  .get(assessmentController.getAssessment);

module.exports = router;
