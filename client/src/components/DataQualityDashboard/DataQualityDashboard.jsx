import React from "react";
import { useSelector } from "react-redux";
import EntitySummaryCards from "../DataQuality/EntitySummary/EntitySummaryCards";
import DataCoveragePie from "../DataQuality/Charts/DataCoveragePie";
import MetricTrendsChart from "../DataQuality/Charts/MetricTrendsChart";
import AlertsPanel from "../DataQuality/Alerts/AlertsPanel";
import EntityQualityTable from "../DataQuality/EntitySummary/EntityQualityTable";
import DataFreshnessGauge from "../DataQuality/Charts/DataFreshnessGauge";

function DataQualityDashboard() {
  const entities = useSelector((state) => state.data.entities);
  const loading = useSelector((state) => state.data.loading);
  const error = useSelector((state) => state.data.error);

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
