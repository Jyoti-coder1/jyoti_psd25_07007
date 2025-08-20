import { useState } from "react";
function ToggleButton({ label }) {
    const [isOn, setIsOn] = useState(false);
    const handleToggle = () => {
        setIsOn(!isOn);
    };
    return (
        <div>
            {label && <span>{label} </span>}
            <button
                onClick={handleToggle}
                style={{ color: isOn ? "green" : "red" }}
            >
                {isOn ? "ON" : "OFF"}
            </button>
        </div>
    );
}
export default ToggleButton;