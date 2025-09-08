import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Feedback from "./pages/Feedback";
import { FeedbackProvider } from "./context/FeedbackContext";

function App() {
  return (
    <FeedbackProvider>
      <nav style={{
        padding: "15px 20px",
        borderBottom: "1px solid #444",
        backgroundColor: "#1f1f1f",
        display: "flex",
        gap: "15px"
      }}>
        <Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>Home</Link>
        <Link to="/feedback" style={{ color: "#fff", textDecoration: "none", fontWeight: 500 }}>Feedback</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </FeedbackProvider>
  );
}

export default App;