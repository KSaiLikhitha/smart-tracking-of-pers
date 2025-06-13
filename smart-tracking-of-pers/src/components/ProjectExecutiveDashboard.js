import React, { useState } from "react";
import "./ProjectExecutiveStyles.css";

const ProjectExecutiveDashboard = () => {
  const [activeTab, setActiveTab] = useState("NA PER");

  const naPerData = [
    { title: "Cases in PER Queue > 2 days", count: 3 },
    {
      title:
        "Open cases with Parent case closed and child cases in open status",
      count: 2,
    },
    { title: "Session time for a specific case", count: 5 },
  ];

  const mappingData = [
    { title: "Map changes exceeding iterations > 3", count: 1 },
    { title: "Cases with more than 1 fix", count: 2 },
    { title: "New Maps exceeding iterations > 5", count: 3 },
    { title: "Cases due for SLA", count: 3 },
  ];

  return (
    <div className="pe-dashboard-container">
      <header className="pe-header">
        <button className="back-btn">&lt;</button>
        <h1>Project Executive</h1>
      </header>

      <div className="tab-switcher">
        <button
          className={`tab ${activeTab === "NA PER" ? "active" : ""}`}
          onClick={() => setActiveTab("NA PER")}
        >
          NA PER
        </button>
        <button
          className={`tab ${activeTab === "MAPPING" ? "active" : ""}`}
          onClick={() => setActiveTab("MAPPING")}
        >
          MAPPING
        </button>
      </div>

      <div className="cards-section">
        {(activeTab === "NA PER" ? naPerData : mappingData).map((item, idx) => (
          <div className="pe-card" key={idx}>
            <p className="pe-card-title">{item.title}</p>
            <h2 className="pe-card-count">{item.count}</h2>
            <button className="pe-view-btn">View Cases</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectExecutiveDashboard;
