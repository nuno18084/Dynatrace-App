import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { DataExport, Charts, Contact } from "./pages";
import Account from "./pages/Account/Account";
import DataGovernance from "./pages/DataGovernance";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/data-governance" replace />} />
        <Route path="data-export" element={<DataExport />} />
        <Route path="charts" element={<Charts />} />
        <Route path="data-governance" element={<DataGovernance />} />
        <Route path="contact" element={<Contact />} />
        <Route path="account" element={<Account />} />
        <Route path="data-governance" element={<DataGovernance />} />
        <Route path="*" element={<Navigate to="/data-governance" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
