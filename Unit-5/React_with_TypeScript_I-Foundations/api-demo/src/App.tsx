import { PostProvider } from "./context/PostContext";
import PostsPage from "./pages/PostsPage";

function App() {
  return (
    <PostProvider>
      <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        <h1>API Demo with React + TypeScript</h1>
        <PostsPage />
      </div>
    </PostProvider>
  );
}

export default App;
