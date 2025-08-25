function Pagination({ total, itemsPerPage, page, setPage }) {
    const pages = Math.ceil(total / itemsPerPage);
    return (
        <div>
            {Array.from({ length: pages }, (_, i) => (
                <button key={i} onClick={() => setPage(i + 1)} disabled={page === i + 1}>
                    {i + 1}
                </button>
            ))}
        </div>
    );
}
export default Pagination;