import React from "react";

function TimerControls({ isRunning, startTimer, stopTimer, resetTimer }) {
    return (
        <div className="controls">
            <button onClick={startTimer} disabled={isRunning}>
                Start
            </button>
            <button onClick={stopTimer} disabled={!isRunning}>
                Stop
            </button>
            <button onClick={resetTimer}>Reset</button>
        </div>
    );
}
export default React.memo(TimerControls);