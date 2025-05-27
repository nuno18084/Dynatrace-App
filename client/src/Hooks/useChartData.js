import { useState, useEffect } from "react";

const useChartData = (t) => {
  const [chartData, setChartData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [polarData, setPolarData] = useState(null);
  const [pieData, setPieData] = useState(null);
  const [radarData, setRadarData] = useState(null);
  const [scatterData, setScatterData] = useState(null);
  const [bubbleData, setBubbleData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/data?page=1&per_page=10")
      .then((response) => response.json())
      .then((data) => {
        // Bar chart: CPU Usage by Entity
        const labels = data.entities.map((entity) => entity.displayName);
        const translatedLabels = labels.map((label) => t(label));
        const cpuUsages = data.entities.map(
          (entity) => entity["metrics.cpu_usage"]
        );
        setChartData({
          labels: translatedLabels.map((label, idx) =>
            t("LabelWithCount", { label: label, count: cpuUsages[idx] })
          ),
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
        const translatedTypeLabels = Object.keys(typeCounts).map((label) =>
          t("LabelWithCount", { label: t(label), count: typeCounts[label] })
        );
        setDoughnutData({
          labels: translatedTypeLabels,
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
          labels: translatedLabels,
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
        const translatedStatusLabels = Object.keys(statusCounts).map((label) =>
          t("LabelWithCount", { label: t(label), count: statusCounts[label] })
        );
        setPolarData({
          labels: translatedStatusLabels,
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
        const translatedEnvLabels = Object.keys(envCounts).map((label) =>
          t("LabelWithCount", { label: t(label), count: envCounts[label] })
        );
        setPieData({
          labels: translatedEnvLabels,
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
          labels: translatedLabels,
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

  return {
    chartData,
    doughnutData,
    lineData,
    polarData,
    pieData,
    radarData,
    scatterData,
    bubbleData,
  };
};

export default useChartData;
