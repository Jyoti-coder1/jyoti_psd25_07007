import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FeedbackProvider } from "./context/FeedbackContext";
import Home from "./pages/Home";
import ViewFeedback from "./pages/ViewFeedback";

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <nav>
          <a href="/">Home</a>
          <a href="/feedbacks">View Feedbacks</a>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feedbacks" element={<ViewFeedback />} />
        </Routes>
      </Router>
    </FeedbackProvider>
  );
}

export default App;