import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import telemetryData from "../data/telemetryData";

const SpeedChart = () => {
  const [selectedLap, setSelectedLap] = useState("Lap 1");

  const getLapData = () => {
    switch (selectedLap) {
      case "Lap 1":
        return telemetryData.lap1;
      case "Lap 2":
        return telemetryData.lap2;
      case "Average Lap":
        return telemetryData.averageLap;
      default:
        return telemetryData.lap1;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.selector}>
        {["Lap 1", "Lap 2", "Average Lap"].map((lap) => (
          <button
            key={lap}
            onClick={() => setSelectedLap(lap)}
            style={{
              ...styles.button,
              backgroundColor: selectedLap === lap ? "#00ffcc" : "#1b1b1b",
              color: selectedLap === lap ? "#000" : "#fff",
            }}
          >
            {lap}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={getLapData()}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid stroke="#333" strokeDasharray="3 3" />
          <XAxis dataKey="time" stroke="#fff" />
          <YAxis stroke="#fff" domain={[0, 300]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1b1b1b",
              border: "none",
              color: "#fff",
            }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Line
            type="monotone"
            dataKey="speed_kph"
            stroke="#00ffcc"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: "20px",
    backgroundColor: "#121212",
    borderRadius: "10px",
    boxShadow: "0 0 20px rgba(0, 255, 204, 0.2)",
  },
  selector: {
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
    transition: "0.2s",
  },
};

export default SpeedChart;
