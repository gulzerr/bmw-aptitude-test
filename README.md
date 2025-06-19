# BMW Electric Cars Data Grid Application

A full-stack web application for managing and displaying electric car data with advanced filtering and search capabilities. This project consists of a Node.js/Express backend API and a React frontend with Material-UI components.

## 🚗 Project Overview

This application provides a comprehensive interface for browsing, searching, and managing electric car data. It features a modern data grid with sorting, filtering, and detailed view capabilities, specifically designed for BMW's electric vehicle portfolio.

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js (using ultimate-express)
- **Database**: MongoDB with Prisma ORM
- **Validation**: Celebrate (Joi-based validation)
- **Development**:
  - Nodemon for hot reloading
  - ts-node for TypeScript execution
- **Additional Libraries**:
  - CORS for cross-origin requests
  - Axios for HTTP requests
  - CSV Parser for data import
  - Morgan-body for request logging
  - dotenv for environment variables

### Frontend

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v7
- **Data Grid**: AG Grid Community Edition
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Styling**: Emotion (CSS-in-JS)

### Database & Infrastructure

- **Database**: MongoDB (containerized with Docker)
- **ORM**: Prisma Client
- **Container**: Docker Compose for MongoDB setup

## 📁 Project Structure

```
bmw-aptitute-test/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── electricCars/
│   │   ├── services/
│   │   │   └── electricCars/
│   │   ├── utils/
│   │   ├── scripts/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── docker-compose.yaml
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── DataGridPage.tsx
│   │   │   └── DetailsPage.tsx
│   │   ├── services/
│   │   ├── types/
│   │   ├── assets/
│   │   └── main.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 🚀 Features

### Backend Features

- RESTful API for electric car data management
- MongoDB integration with Prisma ORM
- Data validation and error handling
- CORS configuration for frontend integration
- Search and filtering capabilities
- Database connection testing endpoint

### Frontend Features

- Modern React application with TypeScript
- Material-UI design system
- Advanced data grid with AG Grid
- Multi-page navigation (Home, Data Grid, Details)
- Responsive design
- Search and filter functionality
- BMW-themed color scheme

### Data Model

The application manages electric car data with the following attributes:

- Brand and Model information
- Performance metrics (acceleration, top speed, range)
- Efficiency and charging specifications
- Physical characteristics (body style, seats)
- Pricing and release information
- Status tracking

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- MongoDB (via Docker)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start MongoDB with Docker:

```bash
docker-compose up -d
```

4. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your database URL
```

5. Generate Prisma client:

```bash
npx prisma generate
```

6. Start the development server:

```bash
yarn dev
```

The backend API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

The frontend application will be available at `http://localhost:5173`

## 🌐 API Endpoints

- `GET /` - API health check
- `GET /test-db` - Database connection test
- `GET /api/electric-cars` - Fetch all electric cars
- `GET /api/electric-cars/search` - Search electric cars with filters
- `DELETE /api/electric-cars/:id` - Delete an electric car

## 🎨 UI Components

The frontend includes several key pages:

- **Home Page**: Welcome screen with navigation
- **Data Grid Page**: Advanced table with sorting, filtering, and search
- **Details Page**: Detailed view of individual electric car records

## 🔒 Environment Variables

### Backend (.env)

```
DATABASE_URL="mongodb://localhost:27017/bmw-electric-cars"
PORT=3000
```

## 📦 Dependencies Highlights

### Key Backend Dependencies

- `@prisma/client` - Database ORM client
- `ultimate-express` - Enhanced Express framework
- `celebrate` - Request validation middleware
- `cors` - Cross-origin resource sharing
- `csv-parser` - CSV file processing

### Key Frontend Dependencies

- `@mui/material` - Material-UI components
- `ag-grid-react` - Advanced data grid
- `react-router-dom` - Client-side routing
- `@emotion/react` - CSS-in-JS styling

## 🏗️ Development Notes

- The application uses TypeScript throughout for type safety
- MongoDB is configured with replica set for advanced features
- The frontend is configured with hot module replacement
- CORS is configured to allow requests from the frontend development server
- The project follows modern React patterns with functional components and hooks
