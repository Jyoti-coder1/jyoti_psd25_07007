import { useRef, useState } from "react";

function FocusInput() {
    const inputRef = useRef(null);
    const [message, setMessage] = useState("");
    const handleFocus = () => {
        inputRef.current.focus();             
        inputRef.current.style.backgroundColor = "#e0f7fa";
        setMessage("Focused!");
    };

    return (
        <div className="container">
            <input ref={inputRef} type="text" placeholder="Type something..." />
            <button onClick={handleFocus}>Focus Input</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default FocusInput;