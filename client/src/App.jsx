import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { saveAs } from "file-saver";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/api/data", {
          timeout: 10000,
        });

        setData(res.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };
    fetchData();
  }, []);

  const downloadCSV = () => {
    const headers = Object.keys(data[0] || {});
    const csvRows = [headers, ...data.map((row) => headers.map((h) => row[h]))];

    const csvContent = csvRows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "mock_entities.csv");
  };

  return (
    <div className="container">
      <h1 className="title">Mock Entities</h1>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Entity ID</th>
              <th>Display Name</th>
              <th>Type</th>
              <th>First Seen</th>
              <th>Last Seen</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.EntityId}</td>
                <td>{item.DisplayName}</td>
                <td>{item.Type}</td>
                <td>{item.FirstSeen}</td>
                <td>{item.LastSeen}</td>
                <td>{item.Tags}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={downloadCSV} className="download-btn">
        Download CSV
      </button>
    </div>
  );
}
export default App;
