import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { LocationProvider } from "./context/LocationContext";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";

function App() {
  return (
    <LocationProvider>
      <Router>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </LocationProvider>
  );
}
export default App;