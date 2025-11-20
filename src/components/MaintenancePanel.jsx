import React, { useState } from "react";
import telemetryData from "../data/telemetryData";

const MaintenancePanel = () => {
  const [selectedLap, setSelectedLap] = useState("lap1");

  const data = telemetryData[selectedLap];

  // Calculate if warning needed based on g_force
  const maxGForce = Math.max(...data.map((d) => d.g_force));
  const warningMessage =
    maxGForce > 1.5
      ? "Tire/Suspension Inspection Recommended"
      : "All Systems Green";

  // Mock Diagnostic Trouble Codes (DTC)
  const dtcList = [
    {
      code: "P0300",
      description: "Random/Multiple Cylinder Misfire Detected",
      status: "Active",
    },
    {
      code: "P0420",
      description: "Catalyst System Efficiency Below Threshold",
      status: "Cleared",
    },
    {
      code: "P0171",
      description: "System Too Lean (Bank 1)",
      status: "Active",
    },
  ];

  // Simulate report download
  const downloadReport = () => {
    const report = {
      lap: selectedLap,
      maxGForce,
      warning: warningMessage,
      dtcList,
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `diagnostic_report_${selectedLap}.json`;
    link.click();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Maintenance Panel</h2>

      {/* Lap Selector */}
      <div style={styles.lapSelector}>
        {["lap1", "lap2", "average"].map((lap) => (
          <button
            key={lap}
            onClick={() => setSelectedLap(lap)}
            style={{
              ...styles.button,
              backgroundColor: selectedLap === lap ? "#00ffcc" : "#333",
              color: selectedLap === lap ? "#000" : "#fff",
            }}
          >
            {lap.replace("lap", "Lap ")}
          </button>
        ))}
      </div>

      {/* Warning Message */}
      <div
        style={{
          ...styles.warningBox,
          backgroundColor: warningMessage.includes("Recommended")
            ? "#ff4444"
            : "#00cc66",
        }}
      >
        {warningMessage}
      </div>

      {/* DTC Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Code</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {dtcList.map((dtc) => (
            <tr key={dtc.code}>
              <td style={styles.td}>{dtc.code}</td>
              <td style={styles.td}>{dtc.description}</td>
              <td style={styles.td}>{dtc.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Download Button */}
      <button style={styles.downloadButton} onClick={downloadReport}>
        Download Diagnostic Report
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#121212",
    padding: "20px",
    borderRadius: "10px",
    color: "#fff",
    fontFamily: "monospace",
  },
  title: {
    marginBottom: "15px",
  },
  lapSelector: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    borderRadius: "5px",
    fontWeight: "bold",
  },
  warningBox: {
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
    fontWeight: "bold",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  th: {
    borderBottom: "1px solid #555",
    padding: "10px",
    textAlign: "left",
  },
  td: {
    borderBottom: "1px solid #333",
    padding: "10px",
  },
  downloadButton: {
    padding: "12px 25px",
    backgroundColor: "#00ffcc",
    color: "#000",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "5px",
  },
};

export default MaintenancePanel;
