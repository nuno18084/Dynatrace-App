const baseOptions = (
  title,
  hasAxes = true,
  t = (x) => x,
  fontColor = "#23272f"
) => {
  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: fontColor } },
      title: { display: true, text: t(title), color: fontColor },
      tooltip: {
        callbacks: hasAxes
          ? {
              label: function (context) {
                // For bar/line charts: show "count label" in tooltip
                return t("LabelWithCount", {
                  label: context.label,
                  count: context.parsed.y,
                });
              },
            }
          : {},
      },
    },
  };
  if (hasAxes) {
    options.scales = {
      x: {
        title: { display: true, text: t("Entity"), color: fontColor },
        ticks: { color: fontColor },
        grid: { color: "#eee" },
      },
      y: {
        title: { display: true, text: t("Value"), color: fontColor },
        ticks: { color: fontColor },
        grid: { color: "#eee" },
      },
    };
  } else if (title && title.toLowerCase().includes("apdex")) {
    // Radar chart (Apdex/Availability/Error Rate)
    options.scales = {
      r: {
        pointLabels: { color: fontColor },
        angleLines: { color: fontColor },
        grid: { color: "#eee" },
        ticks: { color: fontColor },
      },
    };
  }
  return options;
};

export default baseOptions;
