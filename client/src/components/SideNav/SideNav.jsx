import React, { useEffect } from "react";
import useSidebarCollapse from "../../hooks/useSidebarCollapse";
import useShowAllColumns from "../../hooks/showAllColumns";
import "./SideNav.css";
import Logo from "../../assets/BNP_Logo.png";
import ApplyButton from "../Button/Button";
import ColumnSelector from "../SelectedList/SelectedList";
import APISelector from "../SelectedList/SelectedList";
import EnvSelector from "../SelectedList/SelectedList";
import { useFilters } from "../../Hooks/useFilters";
// import { downloadCSV } from "../../utils/downloadCSV";
import {
  FiHome,
  FiInfo,
  FiSettings,
  FiMail,
  FiChevronsLeft,
  FiMenu,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

function SideNav({ headers }) {
  const { collapsed, toggleSidebar } = useSidebarCollapse(false);
  const { showAllColumns, toggleShowColumns } = useShowAllColumns();
  const { filters, setEnv, setApi, setColumns } = useFilters();

  useEffect(() => {
    const body = document.body;
    if (!collapsed) {
      body.classList.add("navbar-open");
    } else {
      body.classList.remove("navbar-open");
    }
  }, [collapsed]);

  // Log whenever filters change
  useEffect(() => {
    console.log("Current Redux State:", {
      environments: filters.env,
      apis: filters.api,
      columns: filters.columns,
    });
  }, [filters]);

  const handleEnvSelect = (val) => {
    const envOptions = ["PROD", "PPD", "UAT", "IST"];
    console.log("Environment Selection:", {
      action: val,
      currentSelection: filters.env,
    });

    if (val === "ALL_SELECT") {
      console.log("Selecting all environments:", envOptions);
      setEnv(envOptions);
    } else if (val === "ALL_DESELECT") {
      console.log("Deselecting all environments");
      setEnv([]);
    } else {
      const currentEnv = Array.isArray(filters.env)
        ? filters.env
        : [filters.env].filter(Boolean);
      const updated = currentEnv.includes(val)
        ? currentEnv.filter((env) => env !== val)
        : [...currentEnv, val];
      console.log("Updated environments:", updated);
      setEnv(updated);
    }
  };

  const handleApiSelect = (val) => {
    const apiOptions = ["Entities", "V1", "V2"];
    console.log("API Selection:", {
      action: val,
      currentSelection: filters.api,
    });

    if (val === "ALL_SELECT") {
      console.log("Selecting all APIs:", apiOptions);
      setApi(apiOptions);
    } else if (val === "ALL_DESELECT") {
      console.log("Deselecting all APIs");
      setApi([]);
    } else {
      const currentApi = Array.isArray(filters.api)
        ? filters.api
        : [filters.api].filter(Boolean);
      const updated = currentApi.includes(val)
        ? currentApi.filter((api) => api !== val)
        : [...currentApi, val];
      console.log("Updated APIs:", updated);
      setApi(updated);
    }
  };

  const handleColumnsSelect = (val, affectedHeaders) => {
    console.log("Columns Selection:", {
      action: val,
      currentSelection: filters.columns,
      affectedHeaders: affectedHeaders,
    });

    if (val === "ALL_SELECT") {
      const toSelect = affectedHeaders || headers;
      console.log("Selecting all columns:", toSelect);
      setColumns(toSelect);
    } else if (val === "ALL_DESELECT") {
      console.log("Deselecting all columns");
      setColumns([]);
    } else {
      const updated = filters.columns.includes(val)
        ? filters.columns.filter((c) => c !== val)
        : [...filters.columns, val];
      console.log("Updated columns:", updated);
      setColumns(updated);
    }
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
          <a href="/" className="sidebar-link">
            <FiHome className="icon" />
            <span className="link-text">Home</span>
          </a>
          <a href="/about" className="sidebar-link">
            <FiInfo className="icon" />
            <span className="link-text">About</span>
          </a>
          <a href="/services" className="sidebar-link">
            <FiSettings className="icon" />
            <span className="link-text">Services</span>
          </a>
          <a href="/contact" className="sidebar-link">
            <FiMail className="icon" />
            <span className="link-text">Contact</span>
          </a>
        </nav>

        <EnvSelector
          headers={["PROD", "PPD", "UAT", "IST"]}
          selectedColumns={
            Array.isArray(filters.env)
              ? filters.env
              : [filters.env].filter(Boolean)
          }
          handleColumnSelect={handleEnvSelect}
          collapsed={collapsed}
          showAllColumns={true}
          title="Environment"
        />

        <APISelector
          headers={["Entities", "V1", "V2"]}
          selectedColumns={
            Array.isArray(filters.api)
              ? filters.api
              : [filters.api].filter(Boolean)
          }
          handleColumnSelect={handleApiSelect}
          collapsed={collapsed}
          showAllColumns={true}
          title="API"
        />

        <ColumnSelector
          headers={headers}
          selectedColumns={filters.columns}
          handleColumnSelect={handleColumnsSelect}
          collapsed={collapsed}
          showAllColumns={showAllColumns}
          title="Select Columns"
        />

        {headers.length > 5 && !collapsed && (
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
          onClick={toggleSidebar}
        />
      </div>
    </div>
  );
}

export default SideNav;
