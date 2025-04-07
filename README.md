# PCOS Smart Insights

## Overview

PCOS Smart Insights is a comprehensive web application designed to help individuals with Polycystic Ovary Syndrome (PCOS) track their symptoms, receive personalized insights, and manage their condition effectively. The application leverages fuzzy logic algorithms to provide nuanced health assessments based on user-reported symptoms.

## Key Features

- **Symptom Tracking**: Log and monitor PCOS-related symptoms over time
- **Fuzzy Logic Analysis**: Advanced assessment system that handles the inherent uncertainty in PCOS diagnosis
- **Personalized Dashboard**: Visual representation of health data and trends
- **Smart Recommendations**: Tailored health suggestions based on symptom patterns
- **Secure Authentication**: Protect personal health information with JWT-based authentication
- **Responsive Design**: Optimized for both desktop and mobile devices

## Technology Stack

### Frontend
- React 18 with TypeScript
- Vite build tool
- Shadcn UI components (based on Radix UI)
- Tailwind CSS for styling
- React Query for server state management
- React Router for navigation

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- RESTful API architecture

## Project Structure

```
pcos-smart-insights/
├── frontend/           # React frontend application
│   ├── public/         # Static assets
│   ├── src/            # Source code
│   │   ├── components/ # UI components
│   │   ├── lib/        # Utilities and services
│   │   │   └── fuzzyLogic/ # Fuzzy logic implementation
│   │   ├── pages/      # Application routes
│   │   └── ...         # Other frontend modules
│   └── ...             # Configuration files
│
├── backend/            # Node.js backend application
│   ├── src/
│   │   ├── config/     # Configuration files
│   │   ├── controllers/# Route controllers
│   │   ├── middleware/ # Express middleware
│   │   ├── models/     # Mongoose data models
│   │   ├── routes/     # API routes
│   │   └── server.js   # Server entry point
│   └── ...             # Configuration files
│
└── fuzzy_logic_documentation.md  # Documentation for the fuzzy logic system
```

## Fuzzy Logic System

The application implements a sophisticated fuzzy logic system to handle the inherent uncertainty in PCOS diagnosis:

1. **Fuzzification**: Converts user-reported symptoms into fuzzy values (0-1 scale)
2. **Rule Evaluation**: Applies medical knowledge encoded as fuzzy rules
3. **Inference Engine**: Aggregates results from multiple rules with weighted contributions
4. **Defuzzification**: Transforms fuzzy outputs into actionable insights and recommendations

This approach allows for more nuanced health assessments compared to traditional binary diagnostic methods.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm, Yarn, or Bun package manager

### Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/NyashaEysenck/fuzzy-pcos-diagnosis.git
   cd pcos-smart-insights-75-main
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment variables
   ```

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env  # Configure your environment variables
   ```

4. Configure environment variables:
   - Backend `.env`: Set MongoDB connection string, JWT secret, and port
   - Frontend `.env`: Configure API URL if needed

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Access the application:
   - Frontend: http://localhost:5173 (default)
   - Backend API: http://localhost:3000 (default)

## Network Configuration

The application is configured to work with flexible IP address handling:

- Frontend Vite server binds to all network interfaces (0.0.0.0)
- API requests use relative paths or dynamically determine the backend URL
- This allows the application to be accessible from other devices on the same network

## Deployment

### Backend
1. Set production environment variables
2. Build and start the server:
   ```bash
   npm start
   ```

### Frontend
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist` directory to your web server

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- LAVIA Health Technologies for the fuzzy logic implementation
- All contributors who have helped shape this project
