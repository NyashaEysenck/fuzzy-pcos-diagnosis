 # PCOS Smart Insights - Frontend

## Overview

The PCOS Smart Insights frontend is a modern, responsive web application built to help users track, analyze, and manage Polycystic Ovary Syndrome (PCOS) symptoms. The application leverages fuzzy logic to provide personalized health insights and recommendations based on user-reported symptoms.

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn UI (based on Radix UI)
- **Styling**: Tailwind CSS
- **State Management**: React Query for server state, React Context for application state
- **Form Handling**: React Hook Form with Zod validation
- **Data Visualization**: Recharts
- **Routing**: React Router DOM

## Features

- **User Authentication**: Secure login and registration system
- **Dashboard**: Overview of PCOS status, recent symptoms, and personalized recommendations
- **Symptom Tracking**: Log and monitor PCOS-related symptoms over time
- **PCOS Analysis**: Advanced assessment using fuzzy logic to provide risk evaluation
- **Personalized Recommendations**: Tailored health suggestions based on symptom patterns
- **Responsive Design**: Optimized for both desktop and mobile devices

## Fuzzy Logic System

The application implements a sophisticated fuzzy logic system to handle the inherent uncertainty in PCOS diagnosis:

1. **Fuzzification**: Converts user-reported symptoms into fuzzy values
2. **Rule Evaluation**: Applies medical knowledge encoded as fuzzy rules
3. **Inference Engine**: Aggregates results from multiple rules
4. **Defuzzification**: Transforms fuzzy outputs into actionable insights

## Project Structure

```
frontend/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── dashboard/ # Dashboard-specific components
│   │   └── ui/        # Shadcn UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and services
│   │   └── fuzzyLogic/ # Fuzzy logic implementation
│   ├── pages/         # Application pages/routes
│   ├── providers/     # Context providers
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
└── ...                # Configuration files
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or Yarn or Bun

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd pcos-smart-insights-75-main/frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```
4. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The application will be available at http://localhost:5173 by default.

### Building for Production

```bash
npm run build
# or
yarn build
# or
bun build
```

## Network Configuration

The frontend is configured to work with flexible IP address handling:

- Vite is configured to bind to all network interfaces (0.0.0.0)
- API requests use relative paths or dynamically determine the backend URL based on the current origin
- This allows the application to be accessible from other devices on the same network

## Additional Commands

- **Lint**: `npm run lint`
- **Preview Production Build**: `npm run preview`

## Contributing

Please follow the project's coding standards and submit pull requests for any new features or bug fixes.