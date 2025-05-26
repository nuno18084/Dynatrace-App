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

export default customCanvasBackgroundColor;
