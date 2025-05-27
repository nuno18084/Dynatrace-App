module.exports = {
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  output: "./",
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
      loadPath: "src/locales/{{lng}}.json",
      savePath: "src/locales/{{lng}}.json",
    },
    keySeparator: false,
    nsSeparator: false,
  },
};
