import React from "react";
import "./Account.css";

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
      </div>
    </div>
  );
}

export default Account;
