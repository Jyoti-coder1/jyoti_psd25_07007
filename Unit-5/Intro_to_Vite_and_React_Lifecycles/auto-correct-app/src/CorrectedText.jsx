export default function CorrectedText({ text, corrections }) {
    // Split by spaces, replace any exact matches from the dictionary, then rejoin
    const words = text.split(" ");
    const correctedWords = words.map((w) => (corrections[w] ? corrections[w] : w));
    const corrected = correctedWords.join(" ");
    return <span>{corrected}</span>;
}