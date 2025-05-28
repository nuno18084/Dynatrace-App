import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useSidebarCollapse from "../../Hooks/useSidebarCollapse";
import useShowAllColumns from "../../Hooks/useShowAllColumns";
import "./SideNav.css";
import Logo from "../../assets/BNP_Logo.png";
import ApplyButton from "../Button/Button";
import ColumnSelector from "../SelectedList/SelectedList";
import APISelector from "../SelectedList/SelectedList";
import EnvSelector from "../SelectedList/SelectedList";
import { useSelector, useDispatch } from "react-redux";
import { setColumns, setEnv, setApi, fetchData } from "../../store/dataSlice";
import {
  FiHome,
  FiBarChart2,
  FiDatabase,
  FiMail,
  FiChevronsLeft,
  FiMenu,
  FiChevronDown,
  FiChevronUp,
  FiLogOut,
  FiDownload,
  FiCheck,
} from "react-icons/fi";
import { useTranslation } from "react-i18next";

function SideNav() {
  const { collapsed, toggleSidebar } = useSidebarCollapse(false);
  const { showAllColumns, toggleShowColumns } = useShowAllColumns();
  const dispatch = useDispatch();
  const { columns, env, api, headers } = useSelector(
    (state) => state.data || {}
  );
  const { t } = useTranslation();

  useEffect(() => {
    const body = document.body;
    const layout = document.querySelector(".layout");

    if (!collapsed) {
      body.classList.add("navbar-open");
      layout?.classList.remove("sidebar-collapsed");
    } else {
      body.classList.remove("navbar-open");
      layout?.classList.add("sidebar-collapsed");
    }
  }, [collapsed]);

  // Log whenever filters change
  useEffect(() => {
    console.log("Current Redux State:", {
      environments: env,
      apis: api,
      columns: columns,
    });
  }, [env, api, columns]);

  const handleEnvSelect = (val) => {
    const envOptions = ["PROD", "PPD", "UAT", "IST"];
    let updated;
    if (val === "ALL_SELECT") {
      updated = envOptions;
    } else if (val === "ALL_DESELECT") {
      updated = [];
    } else {
      const currentEnv = Array.isArray(env) ? env : [env].filter(Boolean);
      updated = currentEnv.includes(val)
        ? currentEnv.filter((e) => e !== val)
        : [...currentEnv, val];
    }
    dispatch(setEnv(updated));
  };

  const handleApiSelect = (val) => {
    const apiOptions = ["Entities", "V1", "V2"];
    let updated;
    if (val === "ALL_SELECT") {
      updated = apiOptions;
    } else if (val === "ALL_DESELECT") {
      updated = [];
    } else {
      const currentApi = Array.isArray(api) ? api : [api].filter(Boolean);
      updated = currentApi.includes(val)
        ? currentApi.filter((a) => a !== val)
        : [...currentApi, val];
    }
    dispatch(setApi(updated));
  };

  const handleColumnsSelect = (val, affectedHeaders) => {
    let updated;
    if (val === "ALL_SELECT") {
      updated = affectedHeaders || [];
    } else if (val === "ALL_DESELECT") {
      updated = [];
    } else {
      updated = columns.includes(val)
        ? columns.filter((c) => c !== val)
        : [...columns, val];
    }
    dispatch(setColumns(updated));
  };

  const handleApply = () => {
    console.log("Applying filters:", { env, columns, api });
    dispatch(fetchData({ env, columns, apiList: api }));
    toggleSidebar();
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-scrollable">
        <div className="sidebar-header">
          <img src={Logo} alt="BNP Logo" className="logo-img" />
          <button className="collapse-btn" onClick={toggleSidebar}>
            {collapsed ? <FiMenu /> : <FiChevronsLeft />}
          </button>
        </div>

        <nav className="sidebar-menu">
          <NavLink to="/data-governance" className="sidebar-link">
            <FiDatabase className="icon" />
            <span className="link-text">{t("Data Governance")}</span>
          </NavLink>
          <NavLink to="/charts" className="sidebar-link">
            <FiBarChart2 className="icon" />
            <span className="link-text">{t("Charts")}</span>
          </NavLink>
          <NavLink to="/data-export" className="sidebar-link">
            <FiDownload className="icon" />
            <span className="link-text">{t("Data Export")}</span>
          </NavLink>
          <NavLink to="/contact" className="sidebar-link">
            <FiMail className="icon" />
            <span className="link-text">{t("Contact")}</span>
          </NavLink>
        </nav>

        <EnvSelector
          headers={["PROD", "PPD", "UAT", "IST"]}
          selectedColumns={Array.isArray(env) ? env : [env].filter(Boolean)}
          handleColumnSelect={handleEnvSelect}
          collapsed={collapsed}
          showAllColumns={true}
          title={t("Environment")}
          className="env-selector"
        />

        <APISelector
          headers={["Entities", "V1", "V2"]}
          selectedColumns={Array.isArray(api) ? api : [api].filter(Boolean)}
          handleColumnSelect={handleApiSelect}
          collapsed={collapsed}
          showAllColumns={true}
          title="API"
          className="api-selector"
        />

        <ColumnSelector
          headers={headers || []}
          selectedColumns={columns || []}
          handleColumnSelect={handleColumnsSelect}
          collapsed={collapsed}
          showAllColumns={showAllColumns}
          title={t("Select Columns")}
          className="columns-selector"
        />

        {(columns || []).length > 5 && !collapsed && (
          <button className="toggle-columns-btn" onClick={toggleShowColumns}>
            {showAllColumns ? <FiChevronUp /> : <FiChevronDown />}
          </button>
        )}
      </div>
      <div className="apply-button-container">
        <ApplyButton
          text="Apply"
          color="#029e7a"
          height="36px"
          onClick={handleApply}
          tick
        >
          {t("Apply")}
        </ApplyButton>
      </div>
    </div>
  );
}

export default SideNav;
