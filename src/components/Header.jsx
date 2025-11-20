import React from "react";

const Sidebar = ({ onSelect }) => {
  return (
    <aside style={styles.sidebar}>
      <nav>
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
      </nav>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    backgroundColor: "#1b1b1b",
    color: "#fff",
    height: "100vh",
    paddingTop: "60px", // push below header
    position: "fixed",
    top: 0,
    left: 0,
  },
  navList: {
    listStyle: "none",
    padding: 0,
  },
  navItem: {
    padding: "15px 20px",
    cursor: "pointer",
    fontFamily: "monospace",
  },
};

export default Sidebar;
