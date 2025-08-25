import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";

function Home() {
    const { state } = useContext(ThemeContext);
    return (
        <div className={`home ${state.theme}`}>
            <h1>Theme Toggle App</h1>
            <ThemeToggle />
        </div>
    )
}
export default Home;