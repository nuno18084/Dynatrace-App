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
  const allSelected = visibleHeaders.every((header) =>
    selectedColumns.includes(header)
  );

  return (
    <div
      className={`column-selector ${collapsed ? "hide-columns" : ""} ${
        showAllColumns ? "expanded" : ""
      }`}
    >
      <h2 className="column-selector-title">{title}</h2>
      <div className="checkbox-grid">
        {/* "All" checkbox */}
        {headers.length > 5 && (
          <div className="checkbox-item">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() =>
                handleColumnSelect(allSelected ? "ALL_DESELECT" : "ALL_SELECT")
              }
            />
            <label>All</label>
          </div>
        )}

        {/* Individual checkboxes */}
        {visibleHeaders.map((header) => (
          <div key={header} className="checkbox-item">
            <input
              type="checkbox"
              checked={selectedColumns.includes(header)}
              onChange={() => handleColumnSelect(header)}
            />
            <label>{header}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedList;
