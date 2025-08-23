function Pagination({ totalPages, currentPage, onPageChange }) {
    return (
        <div className="pagination">
            {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                    <button key={pageNum} onClick={() => onPageChange(pageNum)} className={currentPage === pageNum ? "active" : ""}>
                        {pageNum}
                    </button>
                );
            })}
        </div>
    );
}

export default Pagination;