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

  return (
    <div className="chart-item" style={{ backgroundColor: cardBgColor }}>
      {hasData ? (
        <ChartComponent
          data={data}
          options={{
            ...baseOptions(title, hasAxes),
            plugins: {
              ...baseOptions(title, hasAxes).plugins,
              customCanvasBackgroundColor: { color: chartBgColor },
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
