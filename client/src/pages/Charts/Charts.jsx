import React, { useEffect, useState } from "react";
import "./Charts.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler,
} from "chart.js";
import { useTranslation } from "react-i18next";
import ChartCard from "../../components/Chart/ChartCard";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Filler
);

// Helper for custom background plugin
const customCanvasBackgroundColor = {
  id: "customCanvasBackgroundColor",
  beforeDraw: (chart) => {
    const { ctx, config } = chart;
    const color =
      config.options.plugins &&
      config.options.plugins.customCanvasBackgroundColor &&
      config.options.plugins.customCanvasBackgroundColor.color
        ? config.options.plugins.customCanvasBackgroundColor.color
        : "#fff";
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

function Charts() {
  const [chartData, setChartData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [polarData, setPolarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [radarData, setRadarData] = useState(null);
  const [scatterData, setScatterData] = useState(null);
  const [bubbleData, setBubbleData] = useState(null);
  const { t } = useTranslation();

  // Reactively track dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document !== "undefined") {
      return !document.body.classList.contains("light-theme");
    }
    return true;
  });

  useEffect(() => {
    // Watch for changes to the body's class list
    const observer = new MutationObserver(() => {
      setIsDarkMode(!document.body.classList.contains("light-theme"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const chartBgColor = isDarkMode ? "#23272f" : "#fff";
  const cardBgColor = isDarkMode ? "#1c1c1c" : "#fff";
  const fontColor = isDarkMode ? "#fff" : "#23272f";

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/data?page=1&per_page=10")
      .then((response) => response.json())
      .then((data) => {
        // Bar chart: CPU Usage by Entity
        const labels = data.entities.map((entity) => entity.displayName);
        const cpuUsages = data.entities.map(
          (entity) => entity["metrics.cpu_usage"]
        );
        setChartData({
          labels,
          datasets: [
            {
              label: t("CPU Usage (%)"),
              data: cpuUsages,
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
            },
          ],
        });
        // Doughnut chart: Entity Type Distribution
        const typeCounts = {};
        data.entities.forEach((entity) => {
          typeCounts[entity.type] = (typeCounts[entity.type] || 0) + 1;
        });
        setDoughnutData({
          labels: Object.keys(typeCounts),
          datasets: [
            {
              data: Object.values(typeCounts),
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
        // Line chart: Memory Usage by Entity
        const memoryUsages = data.entities.map(
          (entity) => entity["metrics.memory_usage"]
        );
        setLineData({
          labels,
          datasets: [
            {
              label: t("Memory Usage (%)"),
              data: memoryUsages,
              fill: true,
              borderColor: "rgba(255, 99, 132, 1)",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              tension: 0.3,
            },
          ],
        });
        // Polar Area chart: Status Distribution
        const statusCounts = {};
        data.entities.forEach((entity) => {
          statusCounts[entity.status] = (statusCounts[entity.status] || 0) + 1;
        });
        setPolarData({
          labels: Object.keys(statusCounts),
          datasets: [
            {
              data: Object.values(statusCounts),
              backgroundColor: [
                "rgba(255, 205, 86, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 99, 132, 0.7)",
                "rgba(201, 203, 207, 0.7)",
              ],
              borderColor: [
                "rgba(255, 205, 86, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(201, 203, 207, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
        // Pie chart: Distribution by Environment (from tag_env)
        const envCounts = {};
        data.entities.forEach((entity) => {
          const env = entity.tag_env || "Unknown";
          envCounts[env] = (envCounts[env] || 0) + 1;
        });
        setPieData({
          labels: Object.keys(envCounts),
          datasets: [
            {
              data: Object.values(envCounts),
              backgroundColor: [
                "rgba(153, 102, 255, 0.5)",
                "rgba(255, 159, 64, 0.5)",
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
              ],
              borderColor: [
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
        // Radar chart: Apdex, Availability, Error Rate by Entity
        const apdex = data.entities.map(
          (entity) => entity["metrics.apdex_score"]
        );
        const availability = data.entities.map(
          (entity) => entity["metrics.availability"]
        );
        const errorRate = data.entities.map(
          (entity) => entity["metrics.error_rate"]
        );
        setRadarData({
          labels,
          datasets: [
            {
              label: t("Apdex Score"),
              data: apdex,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
            },
            {
              label: t("Availability"),
              data: availability,
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
            {
              label: t("Error Rate"),
              data: errorRate,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              pointBackgroundColor: "rgba(255, 99, 132, 1)",
            },
          ],
        });
        // Scatter chart: CPU vs Memory Usage
        setScatterData({
          datasets: [
            {
              label: t("CPU vs Memory Usage"),
              data: data.entities.map((entity) => ({
                x: entity["metrics.cpu_usage"],
                y: entity["metrics.memory_usage"],
              })),
              backgroundColor: "rgba(255, 206, 86, 0.7)",
            },
          ],
        });
        // Bubble chart: Requests per Minute vs Error Count (bubble size = active sessions)
        setBubbleData({
          datasets: [
            {
              label: t("Requests/Error/Active Sessions"),
              data: data.entities.map((entity) => ({
                x: entity["metrics.requests_per_minute"],
                y: entity["metrics.error_count"],
                r: Math.max(
                  5,
                  Math.sqrt(entity["metrics.active_sessions"] || 1)
                ),
              })),
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
          ],
        });
      });
  }, [t]);

  // Chart options (reuse for brevity, customize as needed)
  const baseOptions = (title, hasAxes = true) => {
    const options = {
      responsive: true,
      plugins: {
        legend: { position: "top", labels: { color: fontColor } },
        title: { display: true, text: title, color: fontColor },
      },
    };
    if (hasAxes) {
      options.scales = {
        x: { ticks: { color: fontColor }, grid: { color: "#eee" } },
        y: { ticks: { color: fontColor }, grid: { color: "#eee" } },
      };
    }
    return options;
  };

  return (
    <div className="charts-page">
      <h1 className="title">{t("Charts")}</h1>
      <div className="charts-grid">
        <ChartCard
          type="Bar"
          data={chartData}
          title={t("CPU Usage by Entity")}
          hasAxes={true}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={baseOptions}
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          type="Line"
          data={lineData}
          title={t("Memory Usage by Entity")}
          hasAxes={true}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={baseOptions}
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          type="Doughnut"
          data={doughnutData}
          title={t("Entity Type Distribution")}
          hasAxes={false}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={baseOptions}
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          type="Pie"
          data={pieData}
          title={t("Environment Distribution")}
          hasAxes={false}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={baseOptions}
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          type="PolarArea"
          data={polarData}
          title={t("Status Distribution")}
          hasAxes={false}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={baseOptions}
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          type="Radar"
          data={radarData}
          title={t("Apdex/Availability/Error Rate")}
          hasAxes={false}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={baseOptions}
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          type="Scatter"
          data={scatterData}
          title={t("CPU vs Memory Usage")}
          hasAxes={true}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={baseOptions}
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          type="Bubble"
          data={bubbleData}
          title={t("Requests/Error/Active Sessions")}
          hasAxes={true}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={baseOptions}
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
      </div>
    </div>
  );
}

export default Charts;
