import { useState, useRef, useEffect } from "react";

const SUGGESTED_TOPICS = [
  { label: "What is a ROS2 Node?", icon: "⬡" },
  { label: "Explain Publishers & Subscribers", icon: "⟷" },
  { label: "How do ROS2 Services work?", icon: "⇌" },
  { label: "What are ROS2 Actions?", icon: "▶" },
  { label: "Set up a ROS2 workspace", icon: "📁" },
  { label: "Write a simple Python publisher", icon: "🐍" },
  { label: "What is the ROS2 topic graph?", icon: "◈" },
  { label: "Explain ROS2 QoS profiles", icon: "📡" },
];

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ position: "relative", margin: "12px 0", borderRadius: 6, overflow: "hidden", border: "1px solid #1a3a1a" }}>
      <div style={{ background: "#0a1a0a", padding: "6px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1a3a1a" }}>
        <span style={{ color: "#4ade80", fontFamily: "monospace", fontSize: 11, letterSpacing: 2 }}>PYTHON</span>
        <button onClick={handleCopy} style={{ background: copied ? "#1a4a1a" : "transparent", border: "1px solid #2a5a2a", color: copied ? "#4ade80" : "#5a8a5a", padding: "2px 10px", borderRadius: 4, cursor: "pointer", fontFamily: "monospace", fontSize: 11 }}>
          {copied ? "✓ COPIED" : "COPY"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "14px 16px", background: "#060f06", color: "#86efac", fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: 13, lineHeight: 1.7, overflowX: "auto" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

function MessageContent({ content }) {
  const parts = content.split(/(```python[\s\S]*?```)/g);
  return (
    <div>
      {parts.map((part, i) => {
        if (part.startsWith("```python")) {
          const code = part.replace(/```python\n?/, "").replace(/```$/, "").trim();
          return <CodeBlock key={i} code={code} />;
        }
        const lines = part.split("\n");
        return (
          <div key={i}>
            {lines.map((line, j) => {
              const boldLine = line.replace(/\*\*(.*?)\*\*/g, (_, t) => `<strong style="color:#4ade80">${t}</strong>`);
              const codeLine = boldLine.replace(/`([^`]+)`/g, (_, t) => `<code style="background:#0a1a0a;color:#86efac;padding:1px 5px;border-radius:3px;font-family:monospace;font-size:0.92em">${t}</code>`);
              return line.trim() ? (
                <p key={j} style={{ margin: "4px 0", lineHeight: 1.65 }} dangerouslySetInnerHTML={{ __html: codeLine }} />
              ) : <div key={j} style={{ height: 6 }} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function ROS2Tutor() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "**Welcome to ROS2-Sensei! 🤖**\n\nI'm your interactive ROS2 tutor. Whether you're just getting started with robotics or diving deep into advanced concepts, I'm here to guide you.\n\nAsk me anything about ROS2 — nodes, topics, services, actions, Python code, workspace setup, and more. Or pick a topic below to get started!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      // Calls the local Express proxy — no CORS issues, API key stays server-side
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Sorry, something went wrong.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Connection error. Make sure the server is running on port 4000." }]);
    }
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#030a03",
      fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
      display: "flex", flexDirection: "column",
      backgroundImage: `radial-gradient(ellipse at 20% 50%, #051505 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, #071a07 0%, transparent 50%)`
    }}>
      {/* Grid overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: `linear-gradient(rgba(74,222,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.03) 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0 }} />

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, borderBottom: "1px solid #1a3a1a", padding: "0 24px", background: "rgba(3,10,3,0.95)", backdropFilter: "blur(10px)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, padding: "14px 0" }}>
          <div style={{ width: 42, height: 42, border: "2px solid #4ade80", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: "#0a1a0a", flexShrink: 0 }}>
            <span style={{ fontSize: 22 }}>🤖</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: "#4ade80", fontSize: 16, fontWeight: 700, letterSpacing: 3 }}>ROS2-SENSEI</div>
            <div style={{ color: "#2d6a2d", fontSize: 11, letterSpacing: 2 }}>INTERACTIVE ROBOTICS TUTOR v2.0</div>
          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {["NODE", "TOPIC", "SRV"].map(s => (
              <div key={s} style={{ padding: "3px 8px", border: "1px solid #1a4a1a", borderRadius: 3, color: "#2d7a2d", fontSize: 10, letterSpacing: 1 }}>{s}</div>
            ))}
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", marginLeft: 6, animation: "pulse 2s infinite" }} />
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main style={{ flex: 1, overflowY: "auto", position: "relative", zIndex: 5 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 24px 0" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: 20, display: "flex", gap: 14, alignItems: "flex-start", flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, border: msg.role === "assistant" ? "1px solid #1a5a1a" : "1px solid #1a3a4a", background: msg.role === "assistant" ? "#050f05" : "#03080f" }}>
                {msg.role === "assistant" ? "⬡" : "◈"}
              </div>
              <div style={{
                maxWidth: "80%", padding: "12px 16px", borderRadius: msg.role === "user" ? "8px 2px 8px 8px" : "2px 8px 8px 8px",
                background: msg.role === "user" ? "linear-gradient(135deg, #051520, #030a10)" : "linear-gradient(135deg, #050f05, #030a03)",
                border: msg.role === "user" ? "1px solid #0a2a3a" : "1px solid #0a2a0a",
                color: msg.role === "user" ? "#7dd3fc" : "#bbf7d0",
                fontSize: 13.5, lineHeight: 1.6,
              }}>
                <MessageContent content={msg.content} />
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 34, height: 34, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #1a5a1a", background: "#050f05", fontSize: 16 }}>⬡</div>
              <div style={{ padding: "14px 18px", borderRadius: "2px 8px 8px 8px", border: "1px solid #0a2a0a", background: "#050f05", display: "flex", gap: 5, alignItems: "center" }}>
                {[0, 1, 2].map(d => (
                  <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", opacity: 0.7, animation: `bounce 1.2s ${d * 0.2}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {messages.length <= 1 && (
          <div style={{ maxWidth: 860, margin: "16px auto 0", padding: "0 24px" }}>
            <div style={{ color: "#2d5a2d", fontSize: 11, letterSpacing: 2, marginBottom: 12 }}>// SUGGESTED TOPICS</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 8 }}>
              {SUGGESTED_TOPICS.map((t) => (
                <button key={t.label} onClick={() => sendMessage(t.label)}
                  style={{ background: "#050f05", border: "1px solid #1a3a1a", borderRadius: 6, padding: "10px 14px", color: "#86efac", fontSize: 12, textAlign: "left", cursor: "pointer", display: "flex", gap: 10, alignItems: "center", transition: "all 0.15s", fontFamily: "inherit" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#2a6a2a"; e.currentTarget.style.background = "#071207"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a3a1a"; e.currentTarget.style.background = "#050f05"; }}>
                  <span style={{ color: "#4ade80" }}>{t.icon}</span> {t.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Input area */}
      <div style={{ position: "relative", zIndex: 10, borderTop: "1px solid #1a3a1a", background: "rgba(3,10,3,0.97)", backdropFilter: "blur(10px)", padding: "16px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#2d5a2d", fontSize: 14, pointerEvents: "none" }}>›</div>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about nodes, topics, services, code examples..."
              rows={1}
              style={{ width: "100%", background: "#050f05", border: "1px solid #1a3a1a", borderRadius: 8, padding: "12px 14px 12px 30px", color: "#86efac", fontFamily: "inherit", fontSize: 13.5, resize: "none", outline: "none", boxSizing: "border-box", lineHeight: 1.5, caretColor: "#4ade80" }}
              onFocus={e => e.target.style.borderColor = "#2a6a2a"}
              onBlur={e => e.target.style.borderColor = "#1a3a1a"}
            />
          </div>
          <button onClick={() => sendMessage()} disabled={!input.trim() || loading}
            style={{ background: input.trim() && !loading ? "#0a2a0a" : "#040a04", border: `1px solid ${input.trim() && !loading ? "#2a6a2a" : "#0a1a0a"}`, borderRadius: 8, width: 46, height: 46, color: input.trim() && !loading ? "#4ade80" : "#1a3a1a", fontSize: 18, cursor: input.trim() && !loading ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
            ⬆
          </button>
        </div>
        <div style={{ maxWidth: 860, margin: "8px auto 0", color: "#1a3a1a", fontSize: 10, letterSpacing: 1 }}>
          ENTER to send · SHIFT+ENTER for new line · Powered by Claude
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&family=Fira+Code&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #030a03; }
        ::-webkit-scrollbar-thumb { background: #1a3a1a; border-radius: 2px; }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
        @keyframes bounce { 0%,80%,100% { transform:scale(0.6); opacity:0.4; } 40% { transform:scale(1); opacity:1; } }
        textarea::placeholder { color: #1a4a1a; }
      `}</style>
    </div>
  );
}
