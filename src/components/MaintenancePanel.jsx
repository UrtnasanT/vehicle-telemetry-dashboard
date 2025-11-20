import React, { useState } from "react";
import telemetryData from "../data/telemetryData";

const MaintenancePanel = () => {
  const [selectedLap, setSelectedLap] = useState("lap1");
  const data = telemetryData[selectedLap];
  const maxGForce = Math.max(...data.map((d) => d.g_force));

  const warningMessage =
    maxGForce > 1.5
      ? "Tire/Suspension Inspection Recommended"
      : "All Systems Green";

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

      {/* Warning */}
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

      <button style={styles.downloadButton} onClick={downloadReport}>
        Download Diagnostic Report
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    fontFamily: "monospace",
  },
  lapSelector: { display: "flex", gap: "10px", marginBottom: "20px" },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  warningBox: {
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: "20px" },
  th: { borderBottom: "1px solid #555", padding: "10px", textAlign: "left" },
  td: { borderBottom: "1px solid #333", padding: "10px" },
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
