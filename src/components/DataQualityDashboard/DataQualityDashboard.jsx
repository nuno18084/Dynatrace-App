import { useTranslation } from "react-i18next";

const { t } = useTranslation();

if (loading) return <div>{t("Loading data...")}</div>;
