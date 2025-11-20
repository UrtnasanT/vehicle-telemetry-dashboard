import React, { useState } from "react";
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

const PerformanceView = () => {
  const [selectedLap, setSelectedLap] = useState("lap1");
  const data = telemetryData[selectedLap];

  const currentRPM = data[data.length - 1].rpm;

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

      {/* Line Chart */}
      <div style={{ width: "100%", height: 300, marginBottom: "30px" }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#444" strokeDasharray="5 5" />
            <XAxis dataKey="time" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
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

      {/* Circular Gauge */}
      <div style={styles.gauge}>
        <div style={styles.gaugeValue}>{currentRPM} RPM</div>
      </div>
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
  lapSelector: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  gauge: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "5px solid #00ffcc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "20px",
  },
  gaugeValue: {
    textAlign: "center",
  },
};

export default PerformanceView;
