# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Overview

This project demonstrates how to optimize performance in a React application using memoization techniques.
The app has:

A timer that updates every second.

Inputs to add posts with a title and body.

Each Post component has a verify button that toggles between "Verify" and "Verified".

Background color assigned dynamically to posts.


The main goal was to avoid unnecessary re-renders using:

React.memo

useCallback

useMemo


---

## Before Optimization

### App.jsx

import { useEffect, useState } from "react";
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

  // Add Post
  const addPost = () => {
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
  };

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
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}
export default App;


### Post.jsx (Before Optimization)

import { useState } from "react";

function Post({ id, title, body }) {
    const [verifyPost, setVerifyPost] = useState(false);

    const bgColor = `hsl(${Math.random() * 360}, 60%, 70%)`;

    return (
        <div className="post" style={{ background: bgColor }}>
            <h4>{title}</h4>
            <p>{body}</p>
            <button onClick={() => setVerifyPost((v) => !v)}>
                {verifyPost ? "Verified" : "Verify"}
            </button>
        </div>
    );
}
export default Post;

### Problem

Every timer tick causes all posts to re-render.

Background color changes continuously (not stable).

Unnecessary re-renders hurt performance.



---

## After Optimization

Used React.memo → Memoized Post so it only re-renders if its own props change.

Used useCallback → Memoized addPost and toggleVerify event handlers.

Used useMemo → Fixed background color per post (no random change on every tick).


---

## Observations

### Before Optimization

All posts re-rendered every second because the timer state updated in the parent.

Background colors were unstable, changing randomly on each render.

Clicking verify caused re-render of all posts, not just the clicked one.


### After Optimization

Each post renders only once when created.

Background color stays constant as per assigned logic.

Clicking verify updates only the specific post, others remain untouched.

App performance improved significantly with smoother interactions.



---

## Learnings

1. React.memo helps avoid unnecessary re-renders of components when props don’t change.


2. useCallback ensures event handler functions are stable and not re-created on every render.


3. useMemo is useful to cache expensive calculations or values like random background colors.


4. Performance optimization is not always needed, but for apps with frequent re-renders (like timers), memoization provides big improvements.


5. By structuring components properly, React apps remain fast and scalable.

---