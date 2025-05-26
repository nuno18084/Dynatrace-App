import React from "react";
import CountUp from "react-countup";
import {
  FaServer,
  FaCogs,
  FaLayerGroup,
  FaMicrochip,
  FaExclamationTriangle,
} from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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

function getMissingEntities(entities, type) {
  return entities.filter(
    (e) =>
      e.type === type &&
      (!e.metrics || Object.values(e.metrics).some((v) => v == null))
  );
}

function getWarningEntities(entities, type) {
  return entities.filter(
    (e) =>
      e.type === type &&
      ["WARNING", "ERROR", "CRITICAL"].includes((e.status || "").toUpperCase())
  );
}

function EntitySummaryCards({ entities }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(null); // { entityType, metricType }
  const [modalEntities, setModalEntities] = React.useState([]);

  const handleOpenModal = (entityType, metricType) => {
    let details = [];
    if (metricType === "missing") {
      details = getMissingEntities(entities, entityType);
    } else if (metricType === "warning") {
      details = getWarningEntities(entities, entityType);
    }
    setModalEntities(details);
    setModalType({ entityType, metricType });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalType(null);
    setModalEntities([]);
  };

  return (
    <>
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
              <div
                className="entity-metric entity-missing clickable"
                onClick={() => handleOpenModal(type.key, "missing")}
                title="Click to see details"
                style={{ cursor: "pointer" }}
              >
                <FaExclamationTriangle
                  color="#ffb300"
                  style={{ marginRight: 4 }}
                />
                <span>
                  <CountUp end={missingMetrics} duration={1} />
                  &nbsp;missing
                </span>
              </div>
              <div
                className="entity-metric entity-warning clickable"
                onClick={() => handleOpenModal(type.key, "warning")}
                title="Click to see details"
                style={{ cursor: "pointer" }}
              >
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
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {modalType &&
            `${
              ENTITY_TYPES.find((t) => t.key === modalType.entityType)?.label ||
              "Entities"
            } - ${
              modalType.metricType === "missing"
                ? "Missing Metrics"
                : "Warning/Error"
            }`}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers style={{ maxHeight: 400, overflowY: "auto" }}>
          {modalType?.metricType === "missing" && (
            <ul style={{ paddingLeft: 0, listStyle: "none" }}>
              {modalEntities.map((e, idx) => (
                <li
                  key={e.id || e.displayName || idx}
                  style={{ marginBottom: 12 }}
                >
                  <strong>{e.displayName || e.id || "(no name)"}</strong>
                  <br />
                  Missing:{" "}
                  {e.metrics
                    ? Object.entries(e.metrics)
                        .filter(([k, v]) => v == null)
                        .map(([k]) => k)
                        .join(", ")
                    : "all metrics"}
                </li>
              ))}
              {modalEntities.length === 0 && (
                <li>No entities with missing metrics.</li>
              )}
            </ul>
          )}
          {modalType?.metricType === "warning" && (
            <ul style={{ paddingLeft: 0, listStyle: "none" }}>
              {modalEntities.map((e, idx) => (
                <li
                  key={e.id || e.displayName || idx}
                  style={{ marginBottom: 12 }}
                >
                  <strong>{e.displayName || e.id || "(no name)"}</strong>
                  <br />
                  Status: {e.status || "Unknown"}
                </li>
              ))}
              {modalEntities.length === 0 && (
                <li>No entities in warning/error state.</li>
              )}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EntitySummaryCards;
