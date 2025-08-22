import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import PostDetails from "./pages/PostDetails.jsx";
import About from "./pages/About.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/post/:id" element={<PostDetails />}/>
          <Route path="/about" element={<About />}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
