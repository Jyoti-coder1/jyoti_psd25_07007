import { useEffect, useState, useCallback } from "react";
import Post from "./components/Post";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const addPost = useCallback(() => {
    if (title && body) {
      setPosts((prev) => [
        ...prev,
        {
          id: Date.now(),
          title,
          body,
          verifyPost: false,
        },
      ]);
      setTitle("");
      setBody("");
    }
  }, [title, body]);

  const toggleVerify = useCallback((id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, verifyPost: !p.verifyPost } : p
      )
    );
  }, []);

  return (
    <div className="App">
      <h2>Timer: {timer}</h2>

      <input
        type="text"
        placeholder="Enter post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter post body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={addPost}>Add Post</button>

      <h3>Posts</h3>
      <div className="posts">
        {posts.map((post, index) => (
          <Post
            key={post.id}
            {...post}
            toggleVerify={toggleVerify}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
export default App;