import { useTranslation } from "react-i18next";

function EntitySummaryCards(props) {
  const { t } = useTranslation();

  return (
    <div>
      <span className="entity-count-label">{t("Total")}</span>

      <ul>
        <li>{t("No entities with missing metrics.")}</li>
        <li>{t("No entities in warning/error state.")}</li>
      </ul>
    </div>
  );
}

export default EntitySummaryCards;
