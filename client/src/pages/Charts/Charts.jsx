import React, { useState } from "react";
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
import customCanvasBackgroundColor from "../../utils/customCanvasBackgroundColor";
import baseOptions from "../../utils/baseChartOptions";
import useChartData from "../../Hooks/useChartData";
import useDarkMode from "../../Hooks/useDarkMode";
import i18n from "../../locales/i18n";
import { useSelector } from "react-redux";
import Pagination from "@mui/material/Pagination";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";

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

function Charts() {
  const { t } = useTranslation();
  const entities = useSelector((state) => state.data.entities);
  const {
    chartData,
    doughnutData,
    lineData,
    polarData,
    pieData,
    radarData,
    scatterData,
    bubbleData,
  } = useChartData(entities, t);
  const { cardBgColor, chartBgColor, fontColor, isDarkMode } = useDarkMode();

  // Array of chart configs for pagination
  const chartConfigs = [
    {
      key: i18n.language + "-bar",
      type: "Bar",
      data: chartData,
      title: t("CPU Usage by Entity"),
      hasAxes: true,
    },
    {
      key: i18n.language + "-line",
      type: "Line",
      data: lineData,
      title: t("Memory Usage by Entity"),
      hasAxes: true,
    },
    {
      key: i18n.language + "-doughnut",
      type: "Doughnut",
      data: doughnutData,
      title: t("Entity Type Distribution"),
      hasAxes: false,
    },
    {
      key: i18n.language + "-pie",
      type: "Pie",
      data: pieData,
      title: t("Environment Distribution"),
      hasAxes: false,
    },
    {
      key: i18n.language + "-polar",
      type: "PolarArea",
      data: polarData,
      title: t("Status Distribution"),
      hasAxes: false,
    },
    {
      key: i18n.language + "-radar",
      type: "Radar",
      data: radarData,
      title: t("Apdex/Availability/Error Rate"),
      hasAxes: false,
    },
    {
      key: i18n.language + "-scatter",
      type: "Scatter",
      data: scatterData,
      title: t("CPU vs Memory Usage"),
      hasAxes: true,
    },
    {
      key: i18n.language + "-bubble",
      type: "Bubble",
      data: bubbleData,
      title: t("Requests/Error/Active Sessions"),
      hasAxes: true,
    },
  ];

  const [page, setPage] = useState(0);
  const totalPages = chartConfigs.length;
  const currentChart = chartConfigs[page];

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePageChange = (event, value) => setPage(value - 1);

  const handleGoToExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/data-export");
    }, 700);
  };

  // Custom theme for Pagination
  const paginationTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
      primary: {
        main: "#029e7a",
        contrastText: isDarkMode ? "#fff" : "#23272f",
      },
      background: {
        paper: isDarkMode ? "#23272f" : "#fff",
      },
      text: {
        primary: isDarkMode ? "#fff" : "#23272f",
      },
    },
    components: {
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            color: isDarkMode ? "#fff" : "#23272f",
            "&.Mui-selected": {
              backgroundColor: "#029e7a",
              color: "#fff",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "#027a5e",
            },
          },
        },
      },
    },
  });

  return (
    <div
      className="charts-page"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 1400,
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: 1400,
          marginBottom: 16,
        }}
      >
        <h1 className="title">{t("Charts")}</h1>
        <Button
          text="Data Export"
          color="#029e7a"
          onClick={handleGoToExport}
          loading={loading}
        />
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 1400 }}>
          <ChartCard
            key={currentChart.key}
            type={currentChart.type}
            data={currentChart.data}
            title={currentChart.title}
            hasAxes={currentChart.hasAxes}
            cardBgColor={cardBgColor}
            chartBgColor={chartBgColor}
            t={t}
            baseOptions={(title, hasAxes) =>
              baseOptions(title, hasAxes, t, fontColor)
            }
            customCanvasBackgroundColor={customCanvasBackgroundColor}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 32,
        }}
      >
        <ThemeProvider theme={paginationTheme}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={handlePageChange}
            color="primary"
            size="large"
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Charts;
