import { useEffect, useState, useRef } from 'react';
import CountryList from '../components/CountryList';
import Pagination from '../components/Pagination';

function Search() {
    const [query, setQuery] = useState("");
    const [countries, setCountries] = useState([]);
    const [page, setPage] = useState(1);
    const [mode, setMode] = useState("pagination");
    const [loading, setLoading] = useState(false);
    const typingRef = useRef(null);

    useEffect(() => {
        if (!query) return;
        if (typingRef.current) clearTimeout(typingRef.current);

        typingRef.current = setTimeout(() => {
            setLoading(true);
            fetch("https://api.first.org/data/v1/countries")
                .then((res) => res.json())
                .then((data) => {
                    const results = Object.values(data.data).filter((c) =>
                        c.country.toLowerCase().includes(query.toLowerCase())
                    );
                    setCountries(results);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }, 500);
    }, [query]);

    const itemsPerPage = 5;
    const start = (page - 1) * itemsPerPage;
    const paginated = countries.slice(start, start + itemsPerPage);

    return (
        <div>
            <h2>Search Countries</h2>
            <input placeholder="Type country..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={() => setMode(mode === "pagination" ? "infinite" : "pagination")}>
                Switch to {mode === "pagination" ? "Infinite Scroll" : "Pagination"}
            </button>
            {loading && <p>Loading...</p>}
            <CountryList list={mode === "pagination" ? paginated : countries.slice(0, page * itemsPerPage)} />
            {mode === "pagination" && (
                <Pagination total={countries.length} itemsPerPage={itemsPerPage} page={page} setPage={setPage} />
            )}
            {mode === "infinite" && page * itemsPerPage < countries.length && (
                <button onClick={() => setPage(page + 1)}>Load More</button>
            )}
        </div>
    );
}
export default Search;