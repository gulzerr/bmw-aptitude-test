# BMW Data Grid Frontend

This is a React application that implements a generic DataGrid component using AG Grid and Material UI.

## Features

- Generic DataGrid component that can display any type of structural data
- Actions column with View button to see detailed information
- Search functionality
- Filtering with multiple criteria (contains, equals, starts with, ends with, is empty)
- Responsive design using Material UI
- Pagination for large datasets

## Prerequisites

- Node.js (v14 or higher)
- Yarn or npm

## Installation

1. Navigate to the frontend directory
2. Install dependencies:

```bash
yarn install
```

## Running the Application

To start the development server:

```bash
yarn dev
```

The application will be available at http://localhost:5173

## Building for Production

To build the application for production:

```bash
yarn build
```

The build output will be in the `dist` directory.

## Project Structure

The application is currently implemented in a single file (`src/main.tsx`) for simplicity, but it includes:

- Material UI components for styling
- AG Grid for data display
- React Router for navigation
- Search and filter functionality

## Usage

1. Navigate to the home page
2. Click "Go to Data Grid" to see the data grid
3. Use the search box to search across all fields
4. Use the filter controls to filter by specific fields and criteria
5. Click the "View" button to see details for a specific item
