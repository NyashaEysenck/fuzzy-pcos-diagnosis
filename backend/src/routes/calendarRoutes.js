const express = require('express');
const calendarController = require('../controllers/calendarController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Protect all routes
router.use(protect);

// Routes
router.route('/')
  .post(calendarController.createEvent)
  .get(calendarController.getMyEvents);

router.get('/date-range', calendarController.getEventsByDateRange);

router.route('/:id')
  .get(calendarController.getEvent)
  .patch(calendarController.updateEvent)
  .delete(calendarController.deleteEvent);

module.exports = router;
