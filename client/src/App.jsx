import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { Home, Charts, Contact } from "./pages";
import Account from "./pages/Account/Account";
import DataGovernance from "./pages/DataGovernance";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="charts" element={<Charts />} />
          <Route path="services" element={<DataGovernance />} />
          <Route path="contact" element={<Contact />} />
          <Route path="account" element={<Account />} />
          <Route path="data-governance" element={<DataGovernance />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
