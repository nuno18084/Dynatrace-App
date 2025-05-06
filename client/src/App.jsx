import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/data");
        setData(response.data.entities); // Assuming response contains entities
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar dados", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Mock Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Display Name</th>
            <th>Entity ID</th>
            <th>First Seen</th>
            <th>From Relationships</th>
            <th>Last Seen</th>
            <th>Properties</th>
            <th>Tags</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.displayName}</td>
              <td>{item.entityId}</td>
              <td>{new Date(item.firstSeenTimestamp).toLocaleString()}</td>
              <td>
                {item.fromRelationships &&
                  Object.keys(item.fromRelationships).map((key) => (
                    <div key={key}>
                      {key}: {JSON.stringify(item.fromRelationships[key])}
                    </div>
                  ))}
              </td>
              <td>{new Date(item.lastSeenTimestamp).toLocaleString()}</td>
              <td>
                {item.properties &&
                  Object.keys(item.properties).map((key) => (
                    <div key={key}>
                      {key}: {JSON.stringify(item.properties[key])}
                    </div>
                  ))}
              </td>
              <td>
                {item.tags &&
                  item.tags.map((tag, i) => (
                    <div key={i}>
                      {tag.key}: {tag.value}
                    </div>
                  ))}
              </td>
              <td>{item.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
