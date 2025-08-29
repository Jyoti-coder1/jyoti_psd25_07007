import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCoffee } from "./redux/coffeeActions";
import Home from "./pages/Home";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCoffee());
  }, [dispatch]);

  return <Home />;
}

export default App;