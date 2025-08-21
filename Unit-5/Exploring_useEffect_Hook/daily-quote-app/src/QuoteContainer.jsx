import { useState, useEffect } from "react";

function QuoteContainer() {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchQuote = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://api.quotable.io/random");
            const data = await response.json();
            setQuote(data);
        } catch (error) {
            console.error("Failed to fetch quote", error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch quote on component mount and every 30 seconds
    useEffect(() => {
        fetchQuote(); // initial fetch
        const interval = setInterval(fetchQuote, 30000); // 30 seconds
        return () => clearInterval(interval); // cleanup
    }, []);

    return (
        <div className="quote-container">
            {loading ? (
                <div className="loader">Loading...</div>
            ) : (
                quote && (
                    <>
                        <p className="quote">"{quote.content}"</p>
                        <p className="author">- {quote.author}</p>
                    </>
                )
            )}
            <button onClick={fetchQuote}>Get New Quote</button>
        </div>
    );
}

export default QuoteContainer;