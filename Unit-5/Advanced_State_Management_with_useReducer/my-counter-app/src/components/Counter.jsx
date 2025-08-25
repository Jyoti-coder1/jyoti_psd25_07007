import React, { useReducer } from "react";

function reducer(state, action) {
    switch (action.type) {
        case "INCREMENT":
            return { count: state.count + 1 };
        case "DECREMENT":
            return { count: state.count - 1 };
        default:
            return state;
    }
}

const initialState = { count: 0 };

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <div className="counter">
            <h2>Count: {state.count}</h2>
            <div className="btn-group">
                <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
                <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
            </div>
        </div>
    );
}
export default Counter;