import React, { useEffect, useState } from "react";
import "./Charts.css";
import { Bar, Doughnut, Line, PolarArea } from "react-chartjs-2";
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
} from "chart.js";

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
  RadialLinearScale
);

function Charts() {
  const [chartData, setChartData] = useState(null);
  const [doughnutData, setDoughnutData] = useState(null);
  const [lineData, setLineData] = useState(null);
  const [polarData, setPolarData] = useState(null);

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
              label: "CPU Usage (%)",
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
              label: "Memory Usage (%)",
              data: memoryUsages,
              fill: false,
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
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "CPU Usage by Entity" },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Entity Type Distribution" },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Memory Usage by Entity" },
    },
  };

  const polarOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Status Distribution" },
    },
  };

  return (
    <div className="about">
      <h1 className="title">Charts</h1>
      <div className="content">
        <h2>Dynatrace Data Visualization</h2>
        {/* <p>
          This application provides a comprehensive visualization of Dynatrace
          data, allowing users to explore and analyze various metrics and
          information across different environments and APIs.
        </p> */}
        {/* <h3>Features</h3> */}
        {/* <ul>
          <li>Real-time data visualization</li>
          <li>Environment and API filtering</li>
          <li>Column customization</li>
          <li>Data export capabilities</li>
          <li>Infinite scroll pagination</li>
          <li>Dark/Light theme support</li>
        </ul> */}
        <div className="charts-row">
          <div className="chart-item">
            {chartData ? (
              <Bar data={chartData} options={options} />
            ) : (
              <p>Loading bar chart...</p>
            )}
          </div>
          <div className="chart-item">
            {lineData ? (
              <Line data={lineData} options={lineOptions} />
            ) : (
              <p>Loading line chart...</p>
            )}
          </div>
        </div>
        <div className="charts-row">
          <div className="chart-item">
            {doughnutData ? (
              <Doughnut data={doughnutData} options={doughnutOptions} />
            ) : (
              <p>Loading doughnut chart...</p>
            )}
          </div>
          <div className="chart-item">
            {polarData ? (
              <PolarArea data={polarData} options={polarOptions} />
            ) : (
              <p>Loading polar area chart...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Charts;
