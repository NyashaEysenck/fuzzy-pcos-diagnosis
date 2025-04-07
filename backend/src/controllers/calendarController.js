const CalendarEvent = require('../models/calendarEventModel');

// Create a new calendar event
exports.createEvent = async (req, res) => {
  try {
    // Add user id to the request body
    req.body.user = req.user.id;
    
    const newEvent = await CalendarEvent.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        event: newEvent
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get all events for the current user
exports.getMyEvents = async (req, res) => {
  try {
    const events = await CalendarEvent.find({ user: req.user.id })
      .sort({ date: 1 });
    
    res.status(200).json({
      status: 'success',
      results: events.length,
      data: {
        events
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get events for a specific date range
exports.getEventsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide startDate and endDate'
      });
    }
    
    const events = await CalendarEvent.find({
      user: req.user.id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: 1 });
    
    res.status(200).json({
      status: 'success',
      results: events.length,
      data: {
        events
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get a specific event
exports.getEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        message: 'No event found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        message: 'No event found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        event
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await CalendarEvent.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!event) {
      return res.status(404).json({
        status: 'fail',
        message: 'No event found with that ID'
      });
    }
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
