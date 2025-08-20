import { useState } from "react";
import CorrectedText from "./CorrectedText";

export default function AutoCorrectApp() {
    // State to hold the user's raw input
    const [inputText, setInputText] = useState("");
    // Predefined corrections dictionary (exact match keys)
    const corrections = {
        teh: "the",
        recieve: "receive",
        adress: "address",
        wierd: "weird",
        thier: "their",
    };
    // Counter for how many words were corrected
    const countCorrections = (text) => {
        const words = text.split(" ");
        let count = 0;
        for (const w of words) {
            if (corrections[w]) count += 1;
        }
        return count;
    };
    const correctedCount = countCorrections(inputText);
    return (
        <div style={{ maxWidth: 600, margin: "20px auto", fontFamily: "sans-serif" }}>
            <h2>AutoCorrect App</h2>
            {/* Controlled input bound to state */}
            <label htmlFor="userInput">Type text:</label>
            <input
                id="userInput"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Start typing..."
                style={{ width: "100%", padding: "8px", marginTop: "6px", marginBottom: "12px" }}
            />
            {/* Live corrected preview using the reusable component */}
            <div>
                <strong>Corrected Preview:</strong>{" "}
                <CorrectedText text={inputText} corrections={corrections} />
            </div>
            {/* Show how many words were corrected */}
            <div style={{ marginTop: "8px" }}>
                <em>Words corrected: {correctedCount}</em>
            </div>
        </div>
    );
}