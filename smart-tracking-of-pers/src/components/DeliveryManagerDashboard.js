import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectExecutiveStyles.css";

const DeliveryManagerDashboard = () => {
  const [activeTab, setActiveTab] = useState("PER");
  const [casesData, setCasesData] = useState([]);
  const [mappingCasesData, setMappingCasesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/salesforce-data")
      .then((res) => res.json())
      .then((data) => {
        const getCount = (kpiName) => {
          if (!Array.isArray(data)) return 0;
          return data.filter((d) => d["KPI Name"] === kpiName).length;
        };

        const perCases = [
          {
            title: "Cases in PER queue > 2 days (Open/Triage/Technical Review)",
            count: getCount("KPI1 Info"),
            route: "/kpi1",
          },
          {
            title: "Open Cases with PER SME in IBM is working and Waiting on Client > 2 days",
            count: getCount("KPI2 Info"),
            route: "/kpi2",
          },
          {
            title: "Open Cases with PER SME in CTE Technical Implementation / CTE Validation Testing > 2 weeks",
            count: getCount("KPI3 Info"),
            route: "/kpi3",
          },
          {
            title: "Open cases in Production Implementation status > 3 days",
            count: getCount("KPI4 Info"),
            route: "/kpi4",
          },
          {
            title: "Open cases in Production Validation or Completed Status > 14 days",
            count: getCount("KPI5 Info"),
            route: "/kpi5",
          },
          {
            title: "Open cases with Parent case closed and child cases in open status",
            count: getCount("KPI6 Info"),
            route: "/kpi6",
          },
          {
            title: "Cases which have Production Implementation Tracking comments with IBM or TP as issue",
            count: getCount("KPI7 Info"),
            route: "/kpi7",
          },
          {
            title: "Open Cases with turn around time > 60",
            count: getCount("KPI8 Info"),
            route: "/kpi8",
          },
        ];

        const mappingCases = [
          {
            title: "New Maps exceeding iterations > 5",
            count: getCount("MappingKPI1"),
          },
          {
            title: "Map changes exceeding iterations > 3",
            count: getCount("MappingKPI2"),
          },
          {
            title: "Cases with more than 1 fix",
            count: getCount("MappingKPI3"),
          },
          {
            title: "Cases due for SLA",
            count: getCount("MappingKPI4"),
          },
        ];

        setCasesData(perCases);
        setMappingCasesData(mappingCases);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);

        // Default zero-count data for fallback
        const defaultPer = [
          {
            title: "Cases in PER queue > 2 days (Open/Triage/Technical Review)",
            count: 0,
            route: "/kpi1",
          },
          {
            title: "Open Cases with PER SME in IBM is working and Waiting on Client > 2 days",
            count: 0,
            route: "/kpi2",
          },
          {
            title: "Open Cases with PER SME in CTE Technical Implementation / CTE Validation Testing > 2 weeks",
            count: 0,
            route: "/kpi3",
          },
          {
            title: "Open cases in Production Implementation status > 3 days",
            count: 0,
            route: "/kpi4",
          },
          {
            title: "Open cases in Production Validation or Completed Status > 14 days",
            count: 0,
            route: "/kpi5",
          },
          {
            title: "Open cases with Parent case closed and child cases in open status",
            count: 0,
            route: "/kpi6",
          },
          {
            title: "Cases which have Production Implementation Tracking comments with IBM or TP as issue",
            count: 0,
            route: "/kpi7",
          },
          {
            title: "Open Cases with turn around time > 60",
            count: 0,
            route: "/kpi8",
          },
        ];

        const defaultMapping = [
          {
            title: "New Maps exceeding iterations > 5",
            count: 0,
          },
          {
            title: "Map changes exceeding iterations > 3",
            count: 0,
          },
          {
            title: "Cases with more than 1 fix",
            count: 0,
          },
          {
            title: "Cases due for SLA",
            count: 0,
          },
        ];

        setCasesData(defaultPer);
        setMappingCasesData(defaultMapping);
      });
  }, []);

  const dataToShow = activeTab === "PER" ? casesData : mappingCasesData;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Delivery Manager</h1>
      </header>

      <div className="tab-container">
        <button
          className={`tab ${activeTab === "PER" ? "active" : ""}`}
          onClick={() => setActiveTab("PER")}
        >
          PER
        </button>
        <button
          className={`tab ${activeTab === "MAPPING" ? "active" : ""}`}
          onClick={() => setActiveTab("MAPPING")}
        >
          MAPPING
        </button>
      </div>

      <div className="cards-grid">
        {dataToShow.map((item, index) => (
          <div className="case-card" key={index}>
            <div className="card-title">{item.title}</div>
            <div className="case-count">{item.count}</div>
            {item.route && (
              <button className="view-btn" onClick={() => navigate(item.route)}>
                View Cases
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryManagerDashboard;
