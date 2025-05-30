import React, { useEffect, useState } from "react";
import EntitySummaryCards from "../DataQuality/EntitySummary/EntitySummaryCards";
import DataCoveragePie from "../DataQuality/Charts/DataCoveragePie";
import MetricTrendsChart from "../DataQuality/Charts/MetricTrendsChart";
import AlertsPanel from "../DataQuality/Alerts/AlertsPanel";
import EntityQualityTable from "../DataQuality/EntitySummary/EntityQualityTable";
import DataFreshnessGauge from "../DataQuality/Charts/DataFreshnessGauge";

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
        console.log(err);
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
