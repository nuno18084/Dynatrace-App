module.exports = {
  input: ["../**/*.{js,jsx,ts,tsx}"],
  output: "../",
  options: {
    debug: false,
    removeUnusedKeys: false,
    sort: true,
    func: {
      list: ["t", "i18next.t"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    trans: {
      component: "Trans",
      i18nKey: "i18nKey",
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      fallbackKey: function (ns, value) {
        return value;
      },
    },
    lngs: ["en", "fr", "pt"],
    ns: ["translation"],
    defaultLng: "en",
    defaultNs: "translation",
    resource: {
      loadPath: "./en.json",
      savePath: "./{{lng}}.json",
    },
    keySeparator: false,
    nsSeparator: false,
  },
};
