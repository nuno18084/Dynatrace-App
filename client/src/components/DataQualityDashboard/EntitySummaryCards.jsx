import React from "react";
import CountUp from "react-countup";
import {
  FaServer,
  FaCogs,
  FaLayerGroup,
  FaMicrochip,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./EntitySummaryCards.css";

const ENTITY_TYPES = [
  { key: "HOST", label: "Hosts", icon: <FaServer size={32} /> },
  { key: "SERVICE", label: "Services", icon: <FaCogs size={32} /> },
  {
    key: "APPLICATION",
    label: "Applications",
    icon: <FaLayerGroup size={32} />,
  },
  { key: "PROCESS", label: "Processes", icon: <FaMicrochip size={32} /> },
];

function getStatusCounts(entities, type) {
  const filtered = entities.filter((e) => e.type === type);
  const total = filtered.length;
  const missingMetrics = filtered.filter(
    (e) => !e.metrics || Object.values(e.metrics).some((v) => v == null)
  ).length;
  const warningOrError = filtered.filter((e) =>
    ["WARNING", "ERROR", "CRITICAL"].includes((e.status || "").toUpperCase())
  ).length;
  return { total, missingMetrics, warningOrError };
}

function EntitySummaryCards({ entities }) {
  return (
    <div className="entity-summary-cards">
      {ENTITY_TYPES.map((type) => {
        const { total, missingMetrics, warningOrError } = getStatusCounts(
          entities,
          type.key
        );
        return (
          <div className="entity-card" key={type.key}>
            <div className="entity-icon">{type.icon}</div>
            <div className="entity-label">{type.label}</div>
            <div className="entity-count">
              <span>
                <CountUp end={total} duration={1} />
                &nbsp;<span className="entity-count-label">Total</span>
              </span>
            </div>
            <div className="entity-metric entity-missing">
              <FaExclamationTriangle
                color="#ffb300"
                style={{ marginRight: 4 }}
              />
              <span>
                <CountUp end={missingMetrics} duration={1} />
                &nbsp;missing
              </span>
            </div>
            <div className="entity-metric entity-warning">
              <FaExclamationTriangle
                color="#e53935"
                style={{ marginRight: 4 }}
              />
              <span>
                <CountUp end={warningOrError} duration={1} />
                &nbsp;warning/error
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EntitySummaryCards;
