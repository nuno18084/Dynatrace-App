import React from "react";
import "./Account.css";
import { FiLogOut } from "react-icons/fi";
import Button from "../../components/Button/Button";

function Account() {
  // Mock user data (replace with real data as needed)
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Administrator",
    joined: "2023-01-15",
    avatar:
      "https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff",
  };

  const handleSignOut = () => {
    // TODO: Add real sign out logic
    console.log("User signed out");
  };

  return (
    <div className="account">
      <h1 className="title">Account</h1>
      <div className="content">
        <h2>Overview</h2>
        <div className="profile-card">
          <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
          <div className="profile-info">
            <div>
              <strong>Name:</strong> {user.name}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Role:</strong> {user.role}
            </div>
            <div>
              <strong>Joined:</strong> {user.joined}
            </div>
          </div>
        </div>
        <Button
          text={
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FiLogOut
                style={{ fontSize: "1.0rem", verticalAlign: "middle" }}
              />{" "}
              Sign Out
            </span>
          }
          color="#f87171"
          height="auto"
          onClick={handleSignOut}
          style={{
            marginTop: "1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#f87171",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            transition: "background 0.2s",
          }}
        />
      </div>
    </div>
  );
}

export default Account;
