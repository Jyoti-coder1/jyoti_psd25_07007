import useToggleItems from "./hooks/useToggleItems";
import "./App.css";

function App() {
  const [item, toggleItem] = useToggleItems(["A", "B", "C"], 1);

  return (
    <div className="app">
      <h1>useToggleItems Demo</h1>
      <p>Current Item: <span className="item">{item}</span></p>
      <button onClick={toggleItem}>Toggle Item</button>
    </div>
  );
}
export default App;