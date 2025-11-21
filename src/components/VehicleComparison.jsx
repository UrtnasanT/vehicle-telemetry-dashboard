// VehicleComparison.jsx
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const defaultKPIs = ["Max Speed", "Avg Speed", "Max RPM", "Total Fuel Used"];

const VehicleComparison = ({ vehicles, kpiList = defaultKPIs }) => {
  const [selectedKPIs, setSelectedKPIs] = useState(kpiList);

  const chartData = useMemo(() => {
    if (!vehicles || vehicles.length !== 2) return [];

    const [v1, v2] = vehicles;

    const computeKPI = (vehicle) => {
      const telemetry = vehicle.telemetry;
      const maxSpeed = Math.max(...telemetry.map((p) => p.speed_kph));
      const avgSpeed =
        telemetry.reduce((sum, p) => sum + p.speed_kph, 0) / telemetry.length;
      const maxRpm = Math.max(...telemetry.map((p) => p.rpm));
      const totalFuelUsed =
        100 - telemetry[telemetry.length - 1].fuel_level_percent;

      return {
        "Max Speed": Math.round(maxSpeed),
        "Avg Speed": Math.round(avgSpeed),
        "Max RPM": Math.round(maxRpm),
        "Total Fuel Used": Math.round(totalFuelUsed),
      };
    };

    const v1KPIs = computeKPI(v1);
    const v2KPIs = computeKPI(v2);

    return selectedKPIs.map((kpi) => ({
      KPI: kpi,
      [v1.name]: v1KPIs[kpi],
      [v2.name]: v2KPIs[kpi],
    }));
  }, [vehicles, selectedKPIs]);

  const handleKPIChange = (event) => {
    const options = Array.from(event.target.selectedOptions).map(
      (opt) => opt.value,
    );
    setSelectedKPIs(options);
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">
        Multi-Vehicle Performance Comparison
      </h2>

      <div className="mb-4">
        <label className="mr-2">Select KPIs:</label>
        <select
          multiple
          value={selectedKPIs}
          onChange={handleKPIChange}
          className="bg-gray-800 text-white border border-gray-700 p-1 rounded"
        >
          {defaultKPIs.map((kpi) => (
            <option key={kpi} value={kpi}>
              {kpi}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, bottom: 20, left: 0 }}
        >
          <XAxis dataKey="KPI" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "none",
              color: "white",
            }}
          />
          <Legend wrapperStyle={{ color: "white" }} />
          <Bar dataKey={vehicles[0]?.name} fill="#3B82F6" />
          <Bar dataKey={vehicles[1]?.name} fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VehicleComparison;
