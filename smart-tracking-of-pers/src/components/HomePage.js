import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg"
            alt="IBM Logo"
            className="logo"
          />
          <h1 className="title">Smart Tracking of PERs</h1>
        </div>

        <div className="card-container">
          <div className="card" onClick={() => navigate("/delivery-manager")}>
            Login As Delivery Manager
          </div>
          <div className="card">Login As Project Executive</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
