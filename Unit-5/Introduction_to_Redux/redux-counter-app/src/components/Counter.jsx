import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../redux/counterSlice.jsx";

const Counter = () => {
    const count = useSelector((state) => state.count);
    const dispatch = useDispatch();
    return (
        <div className="counter-container">
            <h1>Redux Counter</h1>
            <p>Count: {count}</p>
            <p>State Data (stringified): {JSON.stringify({ count })}</p>
            <div>
                <button onClick={() => dispatch(increment())}>Increment</button>
                <button onClick={() => dispatch(decrement())}>Decrement</button>
            </div>
        </div>
    );
};

export default Counter;