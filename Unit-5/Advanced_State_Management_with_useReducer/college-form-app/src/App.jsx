import { CollegeProvider } from "./context/CollegeContext";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  return(
    <CollegeProvider>
      <Home />
    </CollegeProvider>
  );
}
