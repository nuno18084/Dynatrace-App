const baseOptions = (title, hasAxes = true, fontColor = "#23272f") => {
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
