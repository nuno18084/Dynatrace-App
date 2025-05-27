import React from "react";
import { useTranslation } from "react-i18next";
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
import useDarkMode from "../../../Hooks/useDarkMode";
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
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState(null); // { entityType, metricType }
  const [modalEntities, setModalEntities] = React.useState([]);
  const { isDarkMode, cardBgColor, fontColor } = useDarkMode();

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
              <div className="entity-label">{t(type.label)}</div>
              <div className="entity-count">
                <span>
                  <CountUp end={total} duration={1} />
                  &nbsp;<span className="entity-count-label">{t("Total")}</span>
                </span>
              </div>
              <div
                className="entity-metric entity-missing clickable"
                onClick={() => handleOpenModal(type.key, "missing")}
                title={t("Click to see details")}
                style={{ cursor: "pointer" }}
              >
                <FaExclamationTriangle
                  color="#ffb300"
                  style={{ marginRight: 4 }}
                />
                <span>
                  <CountUp end={missingMetrics} duration={1} />
                  &nbsp;{t("missing")}
                </span>
              </div>
              <div
                className="entity-metric entity-warning clickable"
                onClick={() => handleOpenModal(type.key, "warning")}
                title={t("Click to see details")}
                style={{ cursor: "pointer" }}
              >
                <FaExclamationTriangle
                  color="#e53935"
                  style={{ marginRight: 4 }}
                />
                <span>
                  <CountUp end={warningOrError} duration={1} />
                  &nbsp;{t("warning/error")}
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
        PaperProps={{
          sx: {
            background: cardBgColor,
            color: fontColor,
          },
        }}
      >
        <DialogTitle
          sx={{
            background: cardBgColor,
            color: fontColor,
            fontWeight: 700,
            borderBottom: isDarkMode ? "1px solid #333" : "1px solid #eee",
          }}
        >
          {modalType &&
            `${t(
              ENTITY_TYPES.find((t) => t.key === modalType.entityType)?.label ||
                "Entities"
            )} - ` +
              (modalType.metricType === "missing"
                ? t("Missing Metrics")
                : t("Warning/Error"))}
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8, color: fontColor }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            background: cardBgColor,
            color: fontColor,
            maxHeight: 400,
            overflowY: "auto",
            borderTop: isDarkMode ? "1px solid #333" : "1px solid #eee",
          }}
        >
          {modalType?.metricType === "missing" && (
            <ul style={{ paddingLeft: 0, listStyle: "none" }}>
              {modalEntities.map((e, idx) => (
                <li
                  key={e.id || e.displayName || idx}
                  style={{ marginBottom: 12 }}
                >
                  <strong>{e.displayName || e.id || t("(no name)")}</strong>
                  <br />
                  {t("Missing")}:{" "}
                  {e.metrics
                    ? Object.entries(e.metrics)
                        .filter(([, v]) => v == null)
                        .map(([key]) => key)
                        .join(", ")
                    : t("all metrics")}
                </li>
              ))}
              {modalEntities.length === 0 && (
                <li>{t("No entities with missing metrics.")}</li>
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
                  <strong>{e.displayName || e.id || t("(no name)")}</strong>
                  <br />
                  {t("Status")}: {e.status}
                </li>
              ))}
              {modalEntities.length === 0 && (
                <li>{t("No entities in warning/error state.")}</li>
              )}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default EntitySummaryCards;
