import { useState } from "react";

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    let timerId: any;

    function startTimer() {
        if (!isRunning) {
            setIsRunning(true);
            timerId = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
    }

    function stopTimer() {
        setIsRunning(false);
        clearInterval(timerId);
    }

    function resetTimer() {
        stopTimer();
        setSeconds(0);
    }

    return (
        <div className="timer-container">
            <h1>Timer: {seconds} sec</h1>
            <div className="btn-group">
                <button onClick={startTimer} disabled={isRunning}>
                    Start
                </button>
                <button onClick={stopTimer} disabled={!isRunning}>
                    Stop
                </button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </div>
    );
}

export default Timer;