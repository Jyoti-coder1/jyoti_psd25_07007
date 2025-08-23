import { useContext, useEffect, useRef, useState } from "react";
import { CharacterContext } from "../context/CharacterContext";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";

function Home() {
    const { characters, loading } = useContext(CharacterContext);
    const currentPage = useRef(1);
    const [pageData, setPageData] = useState([]);
    useEffect(() => {
        if (characters.length > 0) {
            const start = (currentPage.current - 1) * 10;
            const end = start + 10;
            setPageData(characters.slice(start, end));
        }
    }, [characters]);
    const handlePageChange = (page) => {
        currentPage.current = page;
        const start = (page - 1) * 10;
        const end = start + 10;
        setPageData(characters.slice(start, end));
    };
    if (loading) return <h2>Loading...</h2>;
    const totalPages = Math.ceil(characters.length / 10);

    return (
        <div className="app">
            <h1>Rick and Morty Characters</h1>
            {/* Character Grid */}
            <div className="grid">
                {pageData.map((char) => (
                    <CharacterCard key={char.id} character={char} />
                ))}
            </div>
            {/* Pagination */}
            <Pagination totalPages={totalPages} currentPage={currentPage.current} onPageChange={handlePageChange} />
        </div>
    );
}

export default Home;