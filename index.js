import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { marked } from 'marked';

// --- PASTE YOUR KEY BELOW BETWEEN THE QUOTES ---
const API_KEY = "AIzaSyAluqkC8k5cA6rSchT7UnhcWkZe6KrwGo0"; 
// ---------------------------------------------
const GATE_CODE = "IMPERIAL";

function App() {
  const [locked, setLocked] = useState(true);
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const checkPassword = (e) => {
    if (e.key === 'Enter') {
      if (password === GATE_CODE) {
        setLocked(false);
      } else {
        setShake(true); setTimeout(() => setShake(false), 400); setPassword(""); 
      }
    }
  };

  const generateAssets = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are SIG7, an Imperial Business Architect. Analyze this offer: "${input}". Create a Sovereign Asset Stack (Markdown): 1. 3 LinkedIn Posts. 2. 3-Part Email Sequence. 3. Visual Brief. Tone: Imperial, High-Status, Warm.`;
      
      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setOutput(marked.parse(text));
    } catch (error) {
      console.error(error); setOutput("Error: Connection to Imperial Engine failed.");
    }
    setLoading(false);
  };

  return React.createElement(React.Fragment, null,
    locked && React.createElement("div", { className: "gate-overlay" },
      React.createElement("input", {
        type: "password", className: `gate-input ${shake ? 'shake' : ''}`,
        placeholder: "ENTER CODE", value: password,
        onChange: (e) => setPassword(e.target.value), onKeyDown: checkPassword, autoFocus: true
      })
    ),
    React.createElement("div", { className: `app-container ${!locked ? 'app-visible' : ''}` },
      React.createElement("div", { style: {borderBottom: '1px solid rgba(216, 180, 254, 0.3)', paddingBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'} },
        React.createElement("div", null,
          React.createElement("h1", null, "SIG 7"),
          React.createElement("p", { style: {color: '#d8b4fe', fontSize: '0.8rem', letterSpacing: '3px', textShadow: '0 0 5px rgba(216, 180, 254, 0.5)'} }, "IMPERIAL INTELLIGENCE")
        ),
        React.createElement("div", { style: {color: '#D4AF37', fontSize: '0.8rem'} }, "● SYSTEM ACTIVE")
      ),
      React.createElement("div", { style: {marginTop: '4rem'} },
        React.createElement("p", { style: {marginBottom: '1rem', color: '#888', fontFamily: 'Cinzel', letterSpacing: '1px'} }, "INITIATE COMMAND:"),
        React.createElement("textarea", { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Describe the Sovereign Offer..." }),
        React.createElement("button", { className: "action-btn", onClick: generateAssets, disabled: loading }, loading ? "ARCHITECTING..." : "EXECUTE")
      ),
      output && React.createElement("div", { className: "output-box", dangerouslySetInnerHTML: { __html: output } })
    )
  );
}
const root = createRoot(document.getElementById('root'));
root.render(React.createElement(App));
