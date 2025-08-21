import { useEffect, useState } from "react";

function QuoteContainer() {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);
    // Fetch quote function
    const fetchQuote = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            setQuote(data);
        }
        catch (error) {
            console.error("Error fetching quote:", error);
        }
        setLoading(false);
    };
    // useEffect for auto-refresh every 30s
    useEffect(() => {
        fetchQuote(); // fetch on mount

        const interval = setInterval(() => {
            fetchQuote();
        }, 30000); // 30 seconds

        return () => clearInterval(interval); // cleanup
    }, []);
    return (
        <div className="quote-box">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <p className="quote">"{quote?.content}"</p>
                    <p className="author">— {quote?.author}</p>
                </>
            )}
            <button onClick={fetchQuote} className="btn">
                Get New Quote
            </button>
        </div>
    );
}
export default QuoteContainer;