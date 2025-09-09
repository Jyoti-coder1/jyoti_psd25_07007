import { useState } from 'react'
import ChatbotButton from './components/ChatbotButton'
import ChatWindow from './components/ChatWindow'

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const pageStyle = {
    fontFamily: "system-ui, sans-serif",
    padding: "40px",
    textAlign: "center",
    minHeight: "100vh",
    background: "linear-gradient(180deg,#f9fafb,#eef2ff)",
  };

  const cardStyle = {
    maxWidth: "600px",
    margin: 0,
    padding: "32px",
    borderRadius: "16px",
    background: "white",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    paddingLeft: window.innerWidth < 480 ? "16px" : "32px",
    paddingRight: window.innerWidth < 480 ? "16px" : "32px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1>Welcome to my AI chat App</h1>
        <p>
          This is a simple React + Gemini integration demo.
          <br />
          Click the chat button in the botton-right to start talking withAI.
        </p>
      </div>
      <ChatbotButton isOpen={isOpen} onClick={() => setIsOpen((s) => !s)} />
      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default App;