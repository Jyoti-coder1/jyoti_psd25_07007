import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./App.css"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./redux/counterSlice.js"

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);