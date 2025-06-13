// App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Grid, Column, Tile } from "@carbon/react";

import DeliveryManagerLogin from "./components/DeliveryManagerLogin";
import Dashboard from "./components/DeliveryManagerDashboard";
import Layout from "./layout/Layout";
import "./App.css";
import ProjectExecutiveLogin from "./components/ProjectExecutiveLogin";
import ProjectExecutiveDashboard from "./components/ProjectExecutiveDashboard";
import Kpi1 from "./KPIs/kpi2";

// Homepage component
function HomePage() {
  const navigate = useNavigate();

  return (
    <Grid fullWidth className="homepage-grid">
      <Column sm={4} md={8} lg={16}>
        <div className="homepage-header">
          <h1>Smart Tracking OF PERS</h1>
        </div>
        <div className="homepage-cards">
          <Tile
            className="homepage-tile"
            onClick={() => navigate("/delivery-manager")}
          >
            <h3>Login as Delivery Manager</h3>
          </Tile>
          <Tile
            className="homepage-tile"
            onClick={() => navigate("/project-executive")}
          >
            <h3>Login as Project Executive</h3>
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}

// App routes with Layout logic
function App() {
  const location = useLocation();
  const noLayoutRoutes = ["/delivery-manager", "/project-executive"];

  const renderWithLayout = (component) =>
    noLayoutRoutes.includes(location.pathname) ? (
      component
    ) : (
      <Layout>{component}</Layout>
    );

  return (
    <Routes>
      <Route path="/" element={renderWithLayout(<HomePage />)} />
      <Route path="/delivery-manager" element={<DeliveryManagerLogin />} />
      <Route path="/project-executive" element={<ProjectExecutiveLogin />} />
      <Route path="/dashboard" element={renderWithLayout(<Dashboard />)} />
      <Route
        path="/projectexecutivedashboard"
        element={renderWithLayout(<ProjectExecutiveDashboard />)}
      />
      <Route path="/kpi2" element={renderWithLayout(<Kpi1 />)} />
    </Routes>
  );
}

// Main wrapper
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
