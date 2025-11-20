import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MaintenancePanel from "./components/MaintenancePanel";

import PerformanceView from "./components/PerformanceView";

function App() {
  const [view, setView] = useState("performance");

  const renderContent = () => {
    switch (view) {
      case "performance":
        return <PerformanceView />;
      case "maintenance":
        return <MaintenancePanel />;
      case "ai":
        return <div>AI Advisor Coming Soon</div>;
      default:
        return <div>Select a view</div>;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelect={setView} />
      <div
        style={{
          marginLeft: "220px",
          paddingTop: "60px",
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#121212",
          color: "#fff",
          padding: "20px",
        }}
      >
        <Header />
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
