import React, { useState, useMemo } from "react";
import telemetryData from "../data/telemetryData";
import { ResponsiveContainer } from "recharts";
const gForceThreshold = 1.5;

const MaintenancePanel = () => {
  const [selectedLap, setSelectedLap] = useState("lap1");

  // --- Get telemetry safely ---
  const data = telemetryData[selectedLap] || [];

  // --- Compute max G-force ---
  const maxGForce = useMemo(
    () => (data.length ? Math.max(...data.map((d) => d.g_force)) : 0),
    [data],
  );

  // --- Compute warning message ---
  const warningMessage = useMemo(
    () =>
      maxGForce > gForceThreshold
        ? "Tire/Suspension Inspection Recommended"
        : "All Systems Green",
    [maxGForce],
  );

  // --- Compute DTC list ---
  const dtcList = useMemo(() => {
    if (maxGForce > gForceThreshold) {
      return [
        {
          code: "P0001",
          description: "High Cornering Force Detected",
          status: "Active",
        },
        {
          code: "P0300",
          description: "Potential Suspension Wear",
          status: "Active",
        },
        {
          code: "C1234",
          description: "Wheel Speed Sensor Fault",
          status: "Active",
        },
      ];
    }
    return [
      {
        code: "P0000",
        description: "No Issues Detected",
        status: "Cleared",
      },
    ];
  }, [maxGForce]);

  // --- Download report ---
  const downloadReport = () => {
    const report = {
      lap: selectedLap,
      maxGForce,
      warning: warningMessage,
      dtcList,
      telemetry: data,
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `diagnostic_report_${selectedLap}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Maintenance Panel</h2>
      {/* Lap Selector */}
      <div style={styles.lapSelector}>
        {["lap1", "lap2", "averageLap"].map((lap) => (
          <button
            key={lap}
            onClick={() => setSelectedLap(lap)}
            style={{
              ...styles.button,
              backgroundColor: selectedLap === lap ? "#00ffcc" : "#333",
              color: selectedLap === lap ? "#000" : "#fff",
            }}
          >
            {lap === "averageLap" ? "Average Lap" : lap.replace("lap", "Lap ")}
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
        {warningMessage} (Max G: {maxGForce.toFixed(2)})
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
            <tr key={dtc.code + dtc.status}>
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
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    fontFamily: "monospace",
    padding: "20px",
  },
  lapSelector: { display: "flex", gap: "10px", marginBottom: "20px" },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 0 8px rgba(0,255,204,0.5)",
    transition: "all 0.2s ease",
  },
  header: {
    marginBottom: "15px",
    color: "#00ffcc",
  },
  warningBox: {
    padding: "15px",
    borderRadius: "5px",
    marginBottom: "20px",
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    boxShadow: "0 0 8px rgba(255,0,0,0.5)",
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
