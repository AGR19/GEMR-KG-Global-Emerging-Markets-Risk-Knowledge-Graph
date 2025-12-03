# Frontend Web Application

This project is a React-based frontend that visualizes economic data on an interactive 3D globe. It connects to a local GraphDB instance to fetch and display real-time statistics for selected countries.

## Features
- **Interactive Globe**: 3D visualization using `react-globe.gl`.
- **Country Selection**: Highlights and allows selection of Brazil, China, Mexico, Philippines, Poland, and Thailand.
- **Data Visualization**: Displays economic indicators (e.g., CPI, Default Rates) using interactive line charts (`recharts`).
- **SPARQL Integration**: Fetches data dynamically from a local GraphDB repository.

## Prerequisites
1. **Node.js**: Ensure Node.js is installed.
2. **Docker**: You must have the GraphDB Docker container running.

## Startup Instructions

### 1. Start GraphDB (Docker)
The frontend relies on the GraphDB backend. Make sure the container is running on port 7200.

```bash
# Run the custom GraphDB image (detached mode)
docker run -d -p 7200:7200 my-graphdb-image
```

### 2. Start the Frontend
Navigate to the `frontend` directory and start the development server.

```bash
cd frontend
npm install  # Install dependencies (only needed once)
npm run dev
```

### 3. Access the App
Open your browser and go to the URL shown in the terminal (usually `http://localhost:5173`).

## Usage
1. **Select a Country**: Click on a highlighted country (Gold color) on the globe.
2. **View Stats**: The panel below the globe will populate with a line chart showing economic data.
3. **Change Indicator**: Use the dropdown menu to switch between different economic indicators.
