import { createStore } from "redux";
import { counterReducer } from "./counterSlice";

export const store = createStore(counterReducer);