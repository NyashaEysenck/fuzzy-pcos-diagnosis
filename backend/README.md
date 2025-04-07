# PCOS Smart Insights Backend

Backend API for the PCOS Smart Insights application, providing endpoints for user authentication, symptom tracking, calendar events, and PCOS assessments.

## Setup

1. Install dependencies:
```
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pcos-smart-insights
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRES_IN=7d
```

3. Start the server:
```
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile (protected)

### Symptoms

- `POST /api/symptoms` - Create a new symptom entry (protected)
- `GET /api/symptoms` - Get all symptoms for the current user (protected)
- `GET /api/symptoms/date-range` - Get symptoms for a specific date range (protected)
- `GET /api/symptoms/:id` - Get a specific symptom entry (protected)
- `PATCH /api/symptoms/:id` - Update a symptom entry (protected)
- `DELETE /api/symptoms/:id` - Delete a symptom entry (protected)

### Calendar Events

- `POST /api/calendar` - Create a new calendar event (protected)
- `GET /api/calendar` - Get all events for the current user (protected)
- `GET /api/calendar/date-range` - Get events for a specific date range (protected)
- `GET /api/calendar/:id` - Get a specific event (protected)
- `PATCH /api/calendar/:id` - Update an event (protected)
- `DELETE /api/calendar/:id` - Delete an event (protected)

### Assessments

- `POST /api/assessments` - Create a new assessment (protected)
- `GET /api/assessments` - Get all assessments for the current user (protected)
- `GET /api/assessments/latest` - Get the latest assessment for the current user (protected)
- `GET /api/assessments/date-range` - Get assessments for a specific date range (protected)
- `GET /api/assessments/:id` - Get a specific assessment (protected)
