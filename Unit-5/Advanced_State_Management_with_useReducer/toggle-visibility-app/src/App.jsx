import { useReducer } from "react";
import './App.css'

const initialState = { isVisible: false };

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { isVisible: ! state.isVisible };
      default:
        return state;
  }
}

function App () {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="app-container">
      <h1>Toggle Visibility App</h1>
      <button className="toggle-btn" onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}>
        Toggle Message
      </button>
      {state.isVisible && <p className="message">Hello, World!</p>}
    </div>
  );
}

export default App;
