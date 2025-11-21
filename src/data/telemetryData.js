const telemetryData = {
  lap1: Array.from({ length: 60 }, (_, i) => ({
    time: i,
    speed_kph: Math.min(
      Math.max(Math.round(Math.sin(i / 10) * 50 + 150 + Math.random() * 20), 0),
      300,
    ),
    rpm: Math.round((150 + Math.random() * 20) * 26),
    g_force: Math.min(
      Math.max(parseFloat((0.5 + Math.random() * 1.5).toFixed(2)), 0),
      4,
    ),
    fuel_level_percent: parseFloat((100 - i * (80 / 59)).toFixed(2)),
  })),
  lap2: Array.from({ length: 60 }, (_, i) => ({
    time: i,
    speed_kph: Math.min(
      Math.max(
        Math.round(Math.sin(i / 12 + 0.5) * 60 + 140 + Math.random() * 15),
        0,
      ),
      300,
    ),
    rpm: Math.min(
      Math.max(
        Math.round(
          (Math.sin(i / 12 + 0.5) * 60 + 140 + Math.random() * 15) * 26,
        ),
        0,
      ),
      8000,
    ),
    g_force: Math.min(
      Math.max(parseFloat((0.6 + Math.random() * 1.4).toFixed(2)), 0),
      4,
    ),
    fuel_level_percent: parseFloat((100 - i * (80 / 59)).toFixed(2)),
  })),
};

// Compute averageLap as the pointwise average of lap1 and lap2
telemetryData.averageLap = telemetryData.lap1.map((point, idx) => {
  const lap2Point = telemetryData.lap2[idx];
  return {
    time: point.time,
    speed_kph: parseFloat(
      ((point.speed_kph + lap2Point.speed_kph) / 2).toFixed(2),
    ),
    rpm: parseFloat(((point.rpm + lap2Point.rpm) / 2).toFixed(2)),
    g_force: parseFloat(((point.g_force + lap2Point.g_force) / 2).toFixed(2)),
    fuel_level_percent: parseFloat(
      ((point.fuel_level_percent + lap2Point.fuel_level_percent) / 2).toFixed(
        2,
      ),
    ),
  };
});

export default telemetryData;
