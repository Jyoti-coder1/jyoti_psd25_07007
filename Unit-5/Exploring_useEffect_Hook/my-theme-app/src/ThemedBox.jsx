import "./App.css";

function ThemedBox({ theme }) {
  return (
    <div className={`themed-box ${theme}`}>
      This is a {theme} themed box
    </div>
  );
}
export default ThemedBox;