import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Digital Pit Crew</h1>
    </header>
  );
};

const styles = {
  header: {
    height: '60px',
    backgroundColor: '#111',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    fontFamily: 'monospace',
  },
};

export default Header;
