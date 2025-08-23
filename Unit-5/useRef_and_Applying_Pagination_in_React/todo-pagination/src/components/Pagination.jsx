import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Pagination() {
    const { currentPage, setCurrentPage, totalPages } = useContext(AppContext);

    return (
        <div className="pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} >
                Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button key={page} onClick={() => setCurrentPage(page)} className={page === currentPage ? "active" : ""} >
                    {page}
                </button>
            ))}

            <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} >
                Next
            </button>
        </div>
    );
}

export default Pagination;