import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about">
      <h1 className="title">About</h1>
      <div className="content">
        <h2>Dynatrace Data Visualization</h2>
        <p>
          This application provides a comprehensive visualization of Dynatrace
          data, allowing users to explore and analyze various metrics and
          information across different environments and APIs.
        </p>
        <h3>Features</h3>
        <ul>
          <li>Real-time data visualization</li>
          <li>Environment and API filtering</li>
          <li>Column customization</li>
          <li>Data export capabilities</li>
          <li>Infinite scroll pagination</li>
          <li>Dark/Light theme support</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
