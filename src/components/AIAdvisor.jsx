import React, { useState } from "react";

const AIAdvisor = () => {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hello! I'm your AI Pit Crew Chief. How can I assist with your vehicle today?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    const aiMessage = {
      from: "ai",
      text: `Analyzing "${input}". Everything looks optimal, but monitor tire/suspension.`,
    };
    setMessages([...messages, userMessage, aiMessage]);
    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>AI Pit Crew Advisor</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              ...styles.message,
              alignSelf: msg.from === "ai" ? "flex-start" : "flex-end",
              backgroundColor: msg.from === "ai" ? "#444" : "#00ffcc",
              color: msg.from === "ai" ? "#fff" : "#000",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Ask the AI Advisor..."
        />
        <button style={styles.sendButton} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    fontFamily: "monospace",
  },
  title: { marginBottom: "10px" },
  chatBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    overflowY: "auto",
    width: "100%",
    height: "300px",
    padding: "10px",
    backgroundColor: "#1b1b1b",
    borderRadius: "5px",
    marginBottom: "10px",
  },
  message: { padding: "10px", borderRadius: "10px", maxWidth: "80%" },
  inputContainer: { display: "flex", gap: "10px", width: "100%" },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    outline: "none",
    backgroundColor: "#222",
    color: "#fff",
  },
  sendButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#00ffcc",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default AIAdvisor;
