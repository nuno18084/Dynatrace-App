import { useTranslation } from "react-i18next";

function DataTable(props) {
  const { t } = useTranslation();

  return (
    <div>
      <p>{t("No data available")}</p>
      <div className="loading-indicator">{t("Loading more data...")}</div>
    </div>
  );
}

export default DataTable;
