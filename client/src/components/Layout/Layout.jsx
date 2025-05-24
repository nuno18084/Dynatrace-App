import React from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../TopNav/TopNav";
import SideNav from "../SideNav/SideNav";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout">
      <TopNav />
      <SideNav />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
