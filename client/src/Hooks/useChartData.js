import { useMemo } from "react";

const useChartData = (entities, t) => {
  return useMemo(() => {
    if (!entities || entities.length === 0) {
      return {
        chartData: null,
        doughnutData: null,
        lineData: null,
        polarData: null,
        pieData: null,
        radarData: null,
        scatterData: null,
        bubbleData: null,
      };
    }
    // Bar chart: CPU Usage by Entity
    const labels = entities.map((entity) => entity.displayName);
    const translatedLabels = labels.map((label) => t(label));
    const cpuUsages = entities.map((entity) => entity["metrics.cpu_usage"]);
    const chartData = {
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
    };
    // Doughnut chart: Entity Type Distribution
    const typeCounts = {};
    entities.forEach((entity) => {
      typeCounts[entity.type] = (typeCounts[entity.type] || 0) + 1;
    });
    const translatedTypeLabels = Object.keys(typeCounts).map((label) =>
      t("LabelWithCount", { label: t(label), count: typeCounts[label] })
    );
    const doughnutData = {
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
    };
    // Line chart: Memory Usage by Entity
    const memoryUsages = entities.map(
      (entity) => entity["metrics.memory_usage"]
    );
    const lineData = {
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
    };
    // Polar Area chart: Status Distribution
    const statusCounts = {};
    entities.forEach((entity) => {
      statusCounts[entity.status] = (statusCounts[entity.status] || 0) + 1;
    });
    const translatedStatusLabels = Object.keys(statusCounts).map((label) =>
      t("LabelWithCount", { label: t(label), count: statusCounts[label] })
    );
    const polarData = {
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
    };
    // Pie chart: Distribution by Environment (from tag_env)
    const envCounts = {};
    entities.forEach((entity) => {
      const env = entity.tag_env || "Unknown";
      envCounts[env] = (envCounts[env] || 0) + 1;
    });
    const translatedEnvLabels = Object.keys(envCounts).map((label) =>
      t("LabelWithCount", { label: t(label), count: envCounts[label] })
    );
    const pieData = {
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
    };
    // Radar chart: Apdex, Availability, Error Rate by Entity
    const apdex = entities.map((entity) => entity["metrics.apdex_score"]);
    const availability = entities.map(
      (entity) => entity["metrics.availability"]
    );
    const errorRate = entities.map((entity) => entity["metrics.error_rate"]);
    const radarData = {
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
    };
    // Scatter chart: CPU vs Memory Usage
    const scatterData = {
      datasets: [
        {
          label: t("CPU vs Memory Usage"),
          data: entities.map((entity) => ({
            x: entity["metrics.cpu_usage"],
            y: entity["metrics.memory_usage"],
          })),
          backgroundColor: "rgba(255, 206, 86, 0.7)",
        },
      ],
    };
    // Bubble chart: Requests per Minute vs Error Count (bubble size = active sessions)
    const bubbleData = {
      datasets: [
        {
          label: t("Requests/Error/Active Sessions"),
          data: entities.map((entity) => ({
            x: entity["metrics.requests_per_minute"],
            y: entity["metrics.error_count"],
            r: Math.max(5, Math.sqrt(entity["metrics.active_sessions"] || 1)),
          })),
          backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
      ],
    };
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
  }, [entities, t]);
};

export default useChartData;
