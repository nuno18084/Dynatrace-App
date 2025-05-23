import "./SelectedList.css";

const SelectedList = ({
  headers = [],
  selectedColumns = [],
  handleColumnSelect,
  collapsed = false,
  showAllColumns = false,
  title = "Select Columns:",
}) => {
  const visibleHeaders = showAllColumns ? headers : headers.slice(0, 5);
  const allSelected = headers.every((header) =>
    selectedColumns.includes(header)
  );

  const handleAllToggle = () => {
    if (allSelected) {
      // Deselect all headers
      handleColumnSelect("ALL_DESELECT", headers);
    } else {
      // Select all headers
      handleColumnSelect("ALL_SELECT", headers);
    }
  };

  return (
    <div
      className={`column-selector ${collapsed ? "hide-columns" : ""} ${
        showAllColumns ? "expanded" : ""
      }`}
    >
      <h2 className="column-selector-title">{title}</h2>
      <div className="checkbox-grid">
        {/* "All" checkbox - show for all sections */}
        <div className="checkbox-item">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleAllToggle}
            id={`all-${title}`}
          />
          <label htmlFor={`all-${title}`}>All</label>
        </div>

        {/* Individual checkboxes */}
        {visibleHeaders.map(
          (header) =>
            header !== "All" && (
              <div key={header} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`${header}-${title}`}
                  checked={selectedColumns.includes(header)}
                  onChange={() => handleColumnSelect(header)}
                />
                <label htmlFor={`${header}-${title}`}>{header}</label>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default SelectedList;
