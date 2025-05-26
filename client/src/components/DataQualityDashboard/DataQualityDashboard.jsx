import React, { useEffect, useState } from "react";
import EntitySummaryCards from "./EntitySummaryCards";
import DataCoveragePie from "./DataCoveragePie";
import MetricTrendsChart from "./MetricTrendsChart";
import AlertsPanel from "./AlertsPanel";
import EntityQualityTable from "./EntityQualityTable";
import DataFreshnessGauge from "./DataFreshnessGauge";

function DataQualityDashboard() {
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://127.0.0.1:5000/api/data?page=1&per_page=100")
      .then((res) => res.json())
      .then((data) => {
        setEntities(data.entities || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading data...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div
      className="dq-dashboard"
      style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <EntitySummaryCards entities={entities} />
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <DataCoveragePie entities={entities} />
        </div>
        <div style={{ flex: 2, minWidth: 320 }}>
          <MetricTrendsChart entities={entities} />
        </div>
      </div>
      <AlertsPanel entities={entities} />
      <DataFreshnessGauge entities={entities} />
      <EntityQualityTable entities={entities} />
    </div>
  );
}

export default DataQualityDashboard;
