import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Contact.css";

function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact">
      <h1 className="title">{t("Contact Us")}</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>{t("Get in Touch")}</h2>
          <p>
            {t(
              "Have questions about our data visualization services? We're here to help!"
            )}
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="icon">📧</span>
              <span>support@dynatraceapp.com</span>
            </div>
            <div className="contact-item">
              <span className="icon">📱</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <span className="icon">📍</span>
              <span>123 Tech Street, Data City, DC 12345</span>
            </div>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">{t("Name")}</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("Your Name")}
            required
          />
          <label htmlFor="email">{t("Email")}</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("Your Email")}
            required
          />
          <label htmlFor="subject">{t("Subject")}</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleChange}
            placeholder={t("Subject")}
            required
          />
          <label htmlFor="message">{t("Message")}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t("Your Message")}
            required
          />
          <button type="submit">{t("Send Message")}</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
