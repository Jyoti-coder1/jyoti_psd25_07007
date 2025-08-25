import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";
import { useState } from "react";

function PrivateRoute({ children }) {
  const { state } = useAuth();
  return state.isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={theme}>
      <Router>
        <AuthProvider>
          <Navbar toggleTheme={toggleTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}
export default App;