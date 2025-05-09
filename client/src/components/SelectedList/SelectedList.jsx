import "./SelectedList.css";

const SelectedList = ({
  headers = [],
  selectedColumns = [],
  handleColumnSelect,
  collapsed = false,
  showAllColumns = false,
  title = "Select Columns:",
}) => {
  return (
    <div
      className={`column-selector ${collapsed ? "hide-columns" : ""} ${
        showAllColumns ? "expanded" : ""
      }`}
    >
      <h2 className="column-selector-title">{title}</h2>
      <div className="checkbox-grid">
        {(showAllColumns ? headers : headers.slice(0, 5)).map((header) => (
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
