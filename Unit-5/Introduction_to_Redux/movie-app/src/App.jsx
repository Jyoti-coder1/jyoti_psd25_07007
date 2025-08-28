import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Watchlist from "./pages/Watchlist";
import Booking from "./pages/Booking";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>
    </>
  );
}
export default App;