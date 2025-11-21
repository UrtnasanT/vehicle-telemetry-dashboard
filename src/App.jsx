import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MaintenancePanel from "./components/MaintenancePanel";
import AIPitCrew from "./components/AIAdvisor";
import PerformanceView from "./components/PerformanceView";
import Login from "./components/Login";

import "./components/App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView] = useState("performance");

  const renderContent = () => {
    switch (view) {
      case "performance":
        return <PerformanceView />;
      case "maintenance":
        return <MaintenancePanel />;
      case "ai":
        return <AIPitCrew />;

      default:
        return <div>Select a view</div>;
    }
  };
  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  return (
    <div
      style={{ display: "flex", height: "100vh", backgroundColor: "#121212" }}
    >
      <Sidebar onSelect={setView} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <Header />
        <main>{renderContent()}</main>
      </div>
    </div>
  );
}

export default App;
