//Declarative : describe UI structure (describe what the UI should look like and the library figure out how to render it.) 
const element = React.createElement("p", null, "hello, World!");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(element);