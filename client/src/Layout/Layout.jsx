import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import TopNav from "../components/TopNav/TopNav";
import SideNav from "../components/SideNav/SideNav";
import "./Layout.css";
import { useDispatch } from "react-redux";
import { fetchData } from "../store/dataSlice";

function Layout() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData({}));
  }, [dispatch]);
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
