import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement } from "../redux/counterSlice"

const Counter = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <div className="counter-container">
            <h1>Redux Toolkit Counter</h1>
            <p className="count-value">{count}</p>
            <div className="btn-group">
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
            </div>
        </div>
    );
};
export default Counter;