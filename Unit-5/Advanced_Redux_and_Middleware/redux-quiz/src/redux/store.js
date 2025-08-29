import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { reducer1 } from "./reducer1";
import { reducer2 } from "./reducer2";
import { reducer3 } from "./reducer3";

const rootReducer = combineReducers({
  auth: reducer1,
  quiz: reducer2,
  score: reducer3,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));