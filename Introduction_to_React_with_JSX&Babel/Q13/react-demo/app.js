const { useState } = React;
function App() {
    const [title, setTitle] = useState("Original Title");
    const [updateCount, setUpdateCount] = useState(0);
    const changeReactTitle = () => {
        setTitle("Title Changed (React) - " + Date.now());
        setUpdateCount(prev => prev + 1);
    };
    return React.createElement(
        "div",
        { style: { fontFamily: "Arial", padding: "20px" } },
        React.createElement("h1", null, title),
        React.createElement("p", null, "DOM Updates: " + updateCount),
        React.createElement(
            "button",
            { onClick: changeReactTitle },
            "Change Title (React)"
        )
    );
}
// Render to page
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));