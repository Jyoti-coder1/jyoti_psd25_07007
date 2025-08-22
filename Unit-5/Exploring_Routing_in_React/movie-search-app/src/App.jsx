import { Routes, Route } from "react-router-dom";
import Search from "./components/Search";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <div>
      <h1>🎬 Movie Search App</h1>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
}

export default App;