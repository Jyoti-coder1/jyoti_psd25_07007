import "./App.css";
import useTimer from "./hooks/userTimer";
import TimerControls from "./components/TimerControls";

function App() {
  const { timer, isRunning, startTimer, stopTimer, resetTimer } = useTimer();

  return (
    <div className="app">
      <h1>Reusable useTimer Hook</h1>
      <div className="timer-display">{timer} sec</div>
      <TimerControls
        isRunning={isRunning}
        startTimer={startTimer}
        stopTimer={stopTimer}
        resetTimer={resetTimer}
      />
    </div>
  );
}
export default App;