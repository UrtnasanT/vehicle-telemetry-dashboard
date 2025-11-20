import React from "react";

const Sidebar = ({ onSelect }) => {
  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Dashboard</h2>
      <ul style={styles.navList}>
        <li style={styles.navItem} onClick={() => onSelect("performance")}>
          Performance View
        </li>
        <li style={styles.navItem} onClick={() => onSelect("maintenance")}>
          Maintenance Panel
        </li>
        <li style={styles.navItem} onClick={() => onSelect("ai")}>
          AI Advisor
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    backgroundColor: "#1b1b1b",
    padding: "20px",
    color: "#fff",
    fontFamily: "monospace",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  navItem: {
    padding: "10px 0",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "5px",
    marginBottom: "10px",
    transition: "0.2s",
  },
};

export default Sidebar;
