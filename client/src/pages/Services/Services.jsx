import React from "react";
import "./Services.css";

function Services() {
  const services = [
    {
      title: "Data Visualization",
      description:
        "Interactive tables and charts for visualizing Dynatrace metrics and data.",
      icon: "📊",
    },
    {
      title: "Data Export",
      description:
        "Export your data in various formats for further analysis and reporting.",
      icon: "📤",
    },
    {
      title: "Environment Management",
      description:
        "Manage and switch between different Dynatrace environments seamlessly.",
      icon: "🌐",
    },
    {
      title: "API Integration",
      description:
        "Connect with different versions of Dynatrace APIs for comprehensive data access.",
      icon: "🔌",
    },
  ];

  return (
    <div className="services">
      <h1 className="title">Our Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
