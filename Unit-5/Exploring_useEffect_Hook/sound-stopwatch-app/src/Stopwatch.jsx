import { useState, useEffect, useRef } from "react";

function Stopwatch() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [targetTime, setTargetTime] = useState(10);
    const [soundPlayed, setSoundPlayed] = useState(false);
    const [targetReached, setTargetReached] = useState(false); // New state for visual cue
    const intervalRef = useRef(null);

    const soundUrl = "https://www.soundjay.com/buttons/sounds/beep-07.mp3";
    const audioRef = useRef(new Audio(soundUrl));

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [isRunning]);

    useEffect(() => {
        if (seconds === Number(targetTime) && !soundPlayed) {
            // Play sound (might fail in some browsers)
            audioRef.current.play().catch(() => console.log("Target reached!"));
            setSoundPlayed(true);
            setTargetReached(true); // Visual cue
        }

        if (seconds < Number(targetTime) && soundPlayed) {
            setSoundPlayed(false);
            setTargetReached(false); // Reset visual cue
        }
    }, [seconds, targetTime, soundPlayed]);

    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
        setIsRunning(false);
        setSeconds(0);
        setSoundPlayed(false);
        setTargetReached(false);
    };

    return (
        <div className="stopwatch">
            <h2>Stopwatch</h2>
            <div
                className="time-display"
                style={{ color: targetReached ? "red" : "black" }} // Highlight on target
            >
                {seconds} s
            </div>
            <div className="buttons">
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Stop</button>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="target-input">
                <label>Target Time (s): </label>
                <input
                    type="number"
                    value={targetTime}
                    onChange={(e) => setTargetTime(e.target.value)}
                />
            </div>
        </div>
    );
}
export default Stopwatch;