import React from "react";
import ReactDOM from "react-dom/client";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GridPage from "./pages/DataGridPage";
import DetailsPage from "./pages/DetailsPage";

ModuleRegistry.registerModules([AllCommunityModule]);

if (import.meta.hot) {
  import.meta.hot.accept();
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#0066B3",
    },
    secondary: {
      main: "#E6E6E6",
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BMW Data Grid Application
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/grid">
          Data Grid
        </Button>
      </Toolbar>
    </AppBar>
  );
};

// Main App Component
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <BrowserRouter>
          <Header />
          <Box sx={{ p: 2 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/grid" element={<GridPage />} />
              <Route path="/details/:id" element={<DetailsPage />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
