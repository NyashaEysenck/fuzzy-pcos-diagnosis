const Symptom = require('../models/symptomModel');

// Create a new symptom entry
exports.createSymptom = async (req, res) => {
  try {
    // Add user id to the request body
    req.body.user = req.user.id;
    
    const newSymptom = await Symptom.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        symptom: newSymptom
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get all symptoms for the current user
exports.getMySymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find({ user: req.user.id })
      .sort({ date: -1 });
    
    res.status(200).json({
      status: 'success',
      results: symptoms.length,
      data: {
        symptoms
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get symptoms for a specific date range
exports.getSymptomsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide startDate and endDate'
      });
    }
    
    const symptoms = await Symptom.find({
      user: req.user.id,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).sort({ date: -1 });
    
    res.status(200).json({
      status: 'success',
      results: symptoms.length,
      data: {
        symptoms
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Get a specific symptom entry
exports.getSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!symptom) {
      return res.status(404).json({
        status: 'fail',
        message: 'No symptom found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        symptom
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Update a symptom entry
exports.updateSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findOneAndUpdate(
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
    
    if (!symptom) {
      return res.status(404).json({
        status: 'fail',
        message: 'No symptom found with that ID'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        symptom
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

// Delete a symptom entry
exports.deleteSymptom = async (req, res) => {
  try {
    const symptom = await Symptom.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!symptom) {
      return res.status(404).json({
        status: 'fail',
        message: 'No symptom found with that ID'
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

// Get cycle statistics based on period symptoms
exports.getCycleStatistics = async (req, res) => {
  try {
    // Find all period symptoms for the current user from both sources
    const CalendarEvent = require('../models/calendarEventModel');
    
    // Get period data from symptoms collection
    const periodSymptoms = await Symptom.find({
      user: req.user.id,
      type: 'period'
    }).sort({ date: 1 });
    
    // Get period data from calendar events
    const periodEvents = await CalendarEvent.find({
      user: req.user.id,
      type: 'period'
    }).sort({ date: 1 });
    
    // Combine and normalize the data from both sources
    const allPeriodData = [
      ...periodSymptoms.map(ps => ({ date: ps.date })),
      ...periodEvents.map(pe => ({ date: pe.date }))
    ].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (allPeriodData.length === 0) {
      return res.status(200).json({
        status: 'success',
        data: {
          cycleStats: {
            averageCycleLength: null,
            lastPeriod: null,
            nextExpectedPeriod: null,
            fertilityWindow: null
          }
        }
      });
    }
    
    // Calculate average cycle length
    let totalCycleLength = 0;
    let cycleCount = 0;
    
    for (let i = 1; i < allPeriodData.length; i++) {
      const currentDate = new Date(allPeriodData[i].date);
      const previousDate = new Date(allPeriodData[i-1].date);
      
      // Calculate days between periods (only if they're more than 7 days apart to avoid counting same period)
      const daysDifference = Math.floor((currentDate - previousDate) / (1000 * 60 * 60 * 24));
      
      if (daysDifference > 7 && daysDifference < 90) { // Ignore very long gaps (likely missed logging)
        totalCycleLength += daysDifference;
        cycleCount++;
      }
    }
    
    const averageCycleLength = cycleCount > 0 ? Math.round(totalCycleLength / cycleCount) : 28; // Default to 28 if not enough data
    
    // Current date for comparison
    const currentDate = new Date();
    
    // Separate past and future periods
    const pastPeriods = allPeriodData.filter(period => new Date(period.date) <= currentDate);
    const futurePeriods = allPeriodData.filter(period => new Date(period.date) > currentDate);
    
    // Get the most recent past period
    let lastPeriod = null;
    if (pastPeriods.length > 0) {
      lastPeriod = pastPeriods[pastPeriods.length - 1];
    } else {
      // No past periods, use the earliest future period and adjust calculations
      if (futurePeriods.length > 0) {
        lastPeriod = futurePeriods[0];
      } else {
        lastPeriod = allPeriodData[allPeriodData.length - 1]; // Fallback
      }
    }
    
    const lastPeriodDate = new Date(lastPeriod.date);
    
    // Calculate next expected period
    let nextExpectedPeriodDate;
    
    if (futurePeriods.length > 0 && new Date(futurePeriods[0].date) < new Date(lastPeriodDate.getTime() + averageCycleLength * 24 * 60 * 60 * 1000)) {
      // If there's a future period scheduled that's sooner than the calculated next period, use that
      nextExpectedPeriodDate = new Date(futurePeriods[0].date);
    } else {
      // Otherwise calculate based on the last period and average cycle length
      nextExpectedPeriodDate = new Date(lastPeriodDate);
      nextExpectedPeriodDate.setDate(lastPeriodDate.getDate() + averageCycleLength);
    }
    
    // Calculate fertility window (typically 14 days before next period, lasting 5 days)
    const fertilityStartDate = new Date(nextExpectedPeriodDate);
    fertilityStartDate.setDate(nextExpectedPeriodDate.getDate() - 14 - 2); // 14 days before next period, plus 2 days buffer
    
    const fertilityEndDate = new Date(fertilityStartDate);
    fertilityEndDate.setDate(fertilityStartDate.getDate() + 5); // 5-day fertility window
    
    // Format dates for response
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    };
    
    const formatDateRange = (startDate, endDate) => {
      const start = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
      const end = endDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      return `${start}-${end}`;
    };
    
    // Find the start date of the last period
    const lastPeriodStartDate = lastPeriodDate;
    
    // Find the end date by looking for the last consecutive period symptom
    // Default to same day if we can't determine the end
    let lastPeriodEndDate = new Date(lastPeriodStartDate);
    lastPeriodEndDate.setDate(lastPeriodStartDate.getDate() + 5); // Default to 5 days if we can't determine
    
    // Find consecutive days with period symptoms
    const periodDatesAroundLastPeriod = allPeriodData
      .filter(period => {
        const periodDate = new Date(period.date);
        const dayDiff = Math.abs(Math.floor((periodDate - lastPeriodStartDate) / (1000 * 60 * 60 * 24)));
        return dayDiff <= 7; // Consider periods within 7 days to be part of the same cycle
      })
      .map(period => new Date(period.date))
      .sort((a, b) => a - b);
    
    if (periodDatesAroundLastPeriod.length > 0) {
      lastPeriodStartDate.setTime(periodDatesAroundLastPeriod[0].getTime());
      lastPeriodEndDate.setTime(periodDatesAroundLastPeriod[periodDatesAroundLastPeriod.length - 1].getTime());
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        cycleStats: {
          averageCycleLength: averageCycleLength,
          lastPeriod: formatDateRange(lastPeriodStartDate, lastPeriodEndDate),
          nextExpectedPeriod: formatDate(nextExpectedPeriodDate),
          fertilityWindow: formatDateRange(fertilityStartDate, fertilityEndDate)
        }
      }
    });
  } catch (error) {
    console.error('Error in getCycleStatistics:', error);
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
