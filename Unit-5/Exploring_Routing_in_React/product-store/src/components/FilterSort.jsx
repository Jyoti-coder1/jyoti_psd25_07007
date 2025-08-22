function FilterSort({ category, setCategory, sortOrder, setSortOrder }) {
    return (
        <div className="filter-sort">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All Categories</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">Fragrances</option>
                <option value="skincare">Skincare</option>
            </select>

            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ marginLeft: "10px" }}>
                <option value="">Sort by Price</option>
                <option value="low">Low to High</option>
                <option value="high">High to Low</option>
            </select>
        </div>
    );
}

export default FilterSort;