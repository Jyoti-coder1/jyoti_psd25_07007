import React from "react";
import Counter from "./counter";

function App() {
  return (
    <div>
      <h2>Counter App</h2>
      {/* Pass initialValue as a prop */}
      <Counter initialValue={5} />
    </div>
  );
}

export default App;
