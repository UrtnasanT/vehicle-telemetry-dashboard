import React, { useState, useRef, useEffect } from "react";

const AIPitCrew = ({ telemetry }) => {
  const [messages, setMessages] = useState([
    {
      sender: "AI",
      text: "Welcome, driver. I will monitor your telemetry meticulously and provide critical, precise insights on your car's performance. Type 'yes' to begin our analysis.",
    },
  ]);
  const [input, setInput] = useState("");

  const messagesRef = useRef(null); // container ref
  const messagesEndRef = useRef(null); // bottom spacer ref

  const summarizeTelemetry = (data) => {
    if (!data || data.length === 0) return {};
    const maxSpeed = Math.max(...data.map((d) => d.speed_kph));
    const maxRPM = Math.max(...data.map((d) => d.rpm));
    const maxG = Math.max(...data.map((d) => d.g_force));
    const fuel = data[data.length - 1].fuel_level_percent;
    return { maxSpeed, maxRPM, maxG, fuel };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "User", text: input };
    const { maxSpeed, maxRPM, maxG, fuel } = summarizeTelemetry(telemetry);

    let aiText = "";

    if (maxG > 1.5) {
      aiText = `High cornering forces detected (${maxG.toFixed(
        2,
      )}G). Tire and suspension inspection is recommended. Type 'yes' for detailed analysis.`;
    } else if (maxSpeed > 250) {
      aiText = `Velocity peaks at ${maxSpeed.toFixed(
        0,
      )} kph. Handling is excellent. Type 'yes' for optimal braking advice.`;
    } else if (fuel < 20) {
      aiText = `Fuel is low (${fuel.toFixed(0)}%). Refuel soon. Type 'yes' for fuel strategy.`;
    } else {
      aiText =
        "All systems nominal. Type 'yes' to receive proactive performance tips.";
    }

    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("fast") || lowerInput.includes("hard")) {
      aiText +=
        " I note you are pushing the car hard; precision is imperative. Type 'yes' for cornering advice.";
    }

    if (lowerInput === "yes") {
      aiText =
        "Excellent. I recommend adjusting your braking points 10% earlier in high-speed corners and monitoring rear axle G-forces carefully.";
    }

    const aiMessage = { sender: "AI", text: aiText };
    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setInput("");
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start scrolled to top on mount
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header1}>AI Advisor</h2>
      <div style={styles.sidebar}>
        <div style={styles.header}>AI Pit Crew Chief</div>
        <div ref={messagesRef} style={styles.messages}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.messageBox,
                alignSelf: msg.sender === "AI" ? "flex-start" : "flex-end",
                backgroundColor: msg.sender === "AI" ? "#222" : "#00ffcc",
                color: msg.sender === "AI" ? "#fff" : "#000",
                maxWidth: "90%",
                fontSize: "1.1rem",
                padding: "15px 20px",
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div style={styles.inputContainer}>
          <textarea
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            style={styles.input}
          />
          <button style={styles.sendButton} onClick={handleSend}>
            Send
          </button>
        </div>
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
  sidebar: {
    width: "500px",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(0,255,204,0.5)",
    fontFamily: "monospace",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  header1: {
    marginBottom: "15px",
    color: "#00ffcc",
  },
  header: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    borderBottom: "2px solid #00ffcc",
    paddingBottom: "8px",
    textAlign: "center",
  },
  messages: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxHeight: "350px",
    overflowY: "auto",
    alignItems: "center",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE 10+
  },
  messageBox: {
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,255,204,0.3)",
  },
  inputContainer: {
    display: "flex",
    gap: "12px",
    marginTop: "15px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontFamily: "monospace",
    backgroundColor: "#333",
    color: "#fff",
    fontSize: "1rem",
    resize: "none",
  },
  sendButton: {
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#00ffcc",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(0,255,204,0.5)",
    fontSize: "1rem",
  },
};

export default AIPitCrew;
