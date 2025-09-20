function FilterControls ({ filterState, dispatch }) {
    return (
        <div className="filters">
            <select
                value={filterState.status}
                onChange={(e) =>
                    dispatch({ type: "SET_STATUS", payload: e.target.value })
                }
            >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="all">All</option>
            </select>
            <input
                type="text"
                placeholder="Filter by label"
                value={filterState.label}
                onChange={(e) =>
                    dispatch({ type: "SET_LABEL", payload: e.target.value })
                }
            />
        </div>
    );
}

export default FilterControls;