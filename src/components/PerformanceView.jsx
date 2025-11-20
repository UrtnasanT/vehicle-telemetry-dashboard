import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import telemetryData from "../data/telemetryData";

const PerformanceView = () => {
  const laps = ["lap1", "lap2", "average"];
  const [selectedLap, setSelectedLap] = useState("lap1");

  const data = telemetryData[selectedLap];
  const lastPoint = data[data.length - 1] || { rpm: 0 };

  return (
    <div style={styles.container}>
      {/* Lap Selector */}
      <div style={styles.lapSelector}>
        {laps.map((lap) => (
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

      {/* Charts */}
      <div style={styles.chartsContainer}>
        {/* Line Chart for speed */}
        <div style={styles.chart}>
          <h3 style={styles.chartTitle}>Speed (kph)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid stroke="#444" />
              <XAxis dataKey="time" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{ backgroundColor: "#222", border: "none" }}
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

        {/* Circular Gauge for RPM */}
        <div style={styles.gauge}>
          <h3 style={styles.chartTitle}>RPM</h3>
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#444"
              strokeWidth="20"
              fill="none"
            />
            <circle
              cx="100"
              cy="100"
              r="90"
              stroke="#00ffcc"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${(lastPoint.rpm / 8000) * 565.48} 565.48`}
              transform="rotate(-90 100 100)"
              strokeLinecap="round"
            />
            <text
              x="100"
              y="110"
              fill="#fff"
              fontSize="20"
              fontFamily="monospace"
              textAnchor="middle"
            >
              {lastPoint.rpm} RPM
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#121212",
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
    fontFamily: "monospace",
    fontWeight: "bold",
    borderRadius: "5px",
  },
  chartsContainer: {
    display: "flex",
    gap: "40px",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chart: {
    flex: "1 1 60%",
    backgroundColor: "#1b1b1b",
    padding: "20px",
    borderRadius: "10px",
  },
  gauge: {
    flex: "1 1 30%",
    backgroundColor: "#1b1b1b",
    padding: "20px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  chartTitle: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "10px",
    fontFamily: "monospace",
  },
};

export default PerformanceView;
