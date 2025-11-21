import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import telemetryData from "../data/telemetryData";
import RPMGauge from "./RPMGaug";

const PerformanceView = () => {
  const [selectedLap, setSelectedLap] = useState("lap1");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Always pull the current lap data
  const data = telemetryData[selectedLap] || [];

  useEffect(() => {
    // Reset to start when lap changes
    setCurrentIndex(0);

    // Animate through all points every second
    const interval = setInterval(() => {
      setCurrentIndex((i) => {
        // Stop at last point
        if (i >= data.length - 1) return i;
        return i + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedLap, data.length]);

  // Current RPM from the animated index
  const currentRPM = data[currentIndex]?.rpm || 0;

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Performance Panel</h2>
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

      {/* Line Chart */}
      <div style={{ width: "100%", height: 300, marginBottom: 30 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#444" strokeDasharray="5 5" />
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#222", border: "none" }}
              itemStyle={{ color: "#00ffcc" }}
            />
            <Line
              type="monotone"
              dataKey="speed_kph"
              stroke="#00ffcc"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* RPM Gauge */}
      <div style={{ width: "250px", height: "350px", marginTop: "20px" }}>
        <RPMGauge rpm={currentRPM} />
      </div>
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
  header: {
    marginBottom: "15px",
    color: "#00ffcc",
  },
  lapSelector: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 0 8px rgba(0,255,204,0.5)",
    transition: "all 0.2s ease",
  },
};

export default PerformanceView;
