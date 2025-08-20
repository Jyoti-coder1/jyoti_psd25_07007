import React, { useState } from "react";

function Counter({ initialValue }) {
    const [count, setCount] = useState(initialValue);
    const handleIncrement = () => {
        setCount(count + 1);
    };
    const handleDecrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={handleIncrement}>Increment</button>
            <button onClick={handleDecrement} disabled={count === 0}>
                Decrement
            </button>
        </div>
    );
}
export default Counter;