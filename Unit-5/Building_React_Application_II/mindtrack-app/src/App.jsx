import { Routes, Route, Navigate } from "react-router-dom";
import { useApp } from "./context/AppContext.jsx";
import NavBar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LogEntry from "./pages/LogEntry.jsx";
import Insights from "./pages/Insights.jsx";
import Timeline from "./pages/Timeline.jsx";
import Mentor from "./pages/Mentor.jsx";
import ExportPage from "./pages/Export.jsx";

export default function App() {
  const { state } = useApp();
  const isStudent = state.user?.role === "student";
  const isMentor = state.user?.role === "mentor";

  return (
    <div className="app-shell">
      {state.user && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        {isStudent && (
          <>
            <Route path="/student/dashboard" element={<Dashboard />} />
            <Route path="/student/log" element={<LogEntry />} />
            <Route path="/student/insights" element={<Insights />} />
            <Route path="/student/timeline" element={<Timeline />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="*" element={<Navigate to="/student/dashboard" />} />
          </>
        )}
        {isMentor && (
          <>
            <Route path="/mentor" element={<Mentor />} />
            <Route path="*" element={<Navigate to="/mentor" />} />
          </>
        )}
        {!state.user && <Route path="*" element={<Navigate to="/" />} />}
      </Routes>
    </div>
  );
}