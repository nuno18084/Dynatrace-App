import { useTranslation } from "react-i18next";

function Account(props) {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="title">{t("Account")}</h1>
      <h2>{t("Overview")}</h2>
      <div>
        <strong>{t("Name")}:</strong> {user.name}
        <strong>{t("Email")}:</strong> {user.email}
        <strong>{t("Role")}:</strong> {user.role}
        <strong>{t("Joined")}:</strong> {user.joined}
      </div>
    </div>
  );
}

export default Account;
