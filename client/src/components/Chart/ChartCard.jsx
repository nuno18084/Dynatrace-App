import React from "react";
import {
  Bar,
  Doughnut,
  Line,
  PolarArea,
  Pie,
  Radar,
  Scatter,
  Bubble,
} from "react-chartjs-2";
import "./ChartCard.css";

function ChartCard({
  type,
  data,
  title,
  hasAxes = true,
  cardBgColor,
  chartBgColor,
  t,
  baseOptions,
  customCanvasBackgroundColor,
}) {
  // Determine which chart component to use
  const ChartComponent = {
    Bar,
    Doughnut,
    Line,
    PolarArea,
    Pie,
    Radar,
    Scatter,
    Bubble,
  }[type];

  // Check if data is available
  const hasData =
    data &&
    data.datasets &&
    data.datasets[0] &&
    data.datasets[0].data &&
    data.datasets[0].data.length > 0;

  // Determine chart size based on type
  let chartStyle = {
    backgroundColor: cardBgColor,
    width: "100%",
    minHeight: "280px",
    boxSizing: "border-box",
    overflow: "auto",
    padding: 24,
    margin: "0 auto",
  };
  if (["Doughnut", "Pie", "PolarArea", "Radar"].includes(type)) {
    chartStyle.maxWidth = 600;
  } else {
    chartStyle.maxWidth = 1400;
  }

  return (
    <div className="chart-item" style={chartStyle}>
      {hasData ? (
        <ChartComponent
          data={data}
          height={300}
          options={{
            ...baseOptions(title, hasAxes),
            plugins: {
              ...baseOptions(title, hasAxes).plugins,
              customCanvasBackgroundColor: { color: chartBgColor },
              title: {
                ...baseOptions(title, hasAxes).plugins.title,
                font: { size: 32 },
              },
              legend: {
                ...baseOptions(title, hasAxes).plugins.legend,
                labels: {
                  ...baseOptions(title, hasAxes).plugins.legend.labels,
                  font: { size: 22 },
                },
              },
            },
          }}
          plugins={[customCanvasBackgroundColor]}
        />
      ) : (
        <div className="no-data">{t("No data available")}</div>
      )}
    </div>
  );
}

export default ChartCard;
