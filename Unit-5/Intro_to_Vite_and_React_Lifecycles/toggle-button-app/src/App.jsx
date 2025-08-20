import ToggleButton from "./ToggleButton";

  function App() {
    return (
      <div>
        <h1>Toggle Button Demo</h1>

        {/* With label */}
        <ToggleButton label="Power:" />

        {/* Without label */}
        <ToggleButton />
      </div>
    );
  }
export default App;
