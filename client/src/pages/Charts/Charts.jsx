import React from "react";
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
  const {
    chartData,
    doughnutData,
    lineData,
    polarData,
    pieData,
    radarData,
    scatterData,
    bubbleData,
  } = useChartData(t);
  const { cardBgColor, chartBgColor, fontColor } = useDarkMode();

  return (
    <div className="charts-page">
      <h1 className="title">{t("Charts")}</h1>
      <div className="charts-grid">
        <ChartCard
          key={i18n.language + "-bar"}
          type="Bar"
          data={chartData}
          title={t("CPU Usage by Entity")}
          hasAxes={true}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={(title, hasAxes) =>
            baseOptions(title, hasAxes, t, fontColor)
          }
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          key={i18n.language + "-line"}
          type="Line"
          data={lineData}
          title={t("Memory Usage by Entity")}
          hasAxes={true}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={(title, hasAxes) =>
            baseOptions(title, hasAxes, t, fontColor)
          }
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          key={i18n.language + "-doughnut"}
          type="Doughnut"
          data={doughnutData}
          title={t("Entity Type Distribution")}
          hasAxes={false}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={(title, hasAxes) =>
            baseOptions(title, hasAxes, t, fontColor)
          }
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          key={i18n.language + "-pie"}
          type="Pie"
          data={pieData}
          title={t("Environment Distribution")}
          hasAxes={false}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={(title, hasAxes) =>
            baseOptions(title, hasAxes, t, fontColor)
          }
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          key={i18n.language + "-polar"}
          type="PolarArea"
          data={polarData}
          title={t("Status Distribution")}
          hasAxes={false}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={(title, hasAxes) =>
            baseOptions(title, hasAxes, t, fontColor)
          }
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          key={i18n.language + "-radar"}
          type="Radar"
          data={radarData}
          title={t("Apdex/Availability/Error Rate")}
          hasAxes={false}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={(title, hasAxes) =>
            baseOptions(title, hasAxes, t, fontColor)
          }
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          key={i18n.language + "-scatter"}
          type="Scatter"
          data={scatterData}
          title={t("CPU vs Memory Usage")}
          hasAxes={true}
          cardBgColor={cardBgColor}
          chartBgColor={chartBgColor}
          t={t}
          baseOptions={(title, hasAxes) =>
            baseOptions(title, hasAxes, t, fontColor)
          }
          customCanvasBackgroundColor={customCanvasBackgroundColor}
        />
        <ChartCard
          key={i18n.language + "-bubble"}
          type="Bubble"
          data={bubbleData}
          title={t("Requests/Error/Active Sessions")}
          hasAxes={true}
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
  );
}

export default Charts;
