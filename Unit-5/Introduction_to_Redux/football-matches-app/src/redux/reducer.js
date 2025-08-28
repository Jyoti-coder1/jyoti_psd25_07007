const initialState = {
    isLoading: false,
    isError: false,
    footballMatches: [],
    favorites: [],
    searchQuery: "",
    filters: {
        team: "",
        result: "",
        date: "",
    },
    notifications: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "FETCH_MATCHES_REQUEST":
            return { ...state, isLoading: true, isError: false };
        case "FETCH_MATCHES_SUCCESS":
            return { ...state, isLoading: false, footballMatches: action.payload };
        case "FETCH_MATCHES_FAILURE":
            return { ...state, isLoading: false, isError: true };
        case "ADD_FAVORITE":
            return { ...state, favorites: [...state.favorites, action.payload] };
        case "REMOVE_FAVORITE":
            return {
                ...state,
                favorites: state.favorites.filter((m) => m.match_id !== action.payload),
            };
        case "SET_SEARCH":
            return { ...state, searchQuery: action.payload };
        case "SET_FILTERS":
            return { ...state, filters: { ...state.filters, ...action.payload } };
        case "ADD_NOTIFICATION":
            return { ...state, notifications: [...state.notifications, action.payload] };
        default:
            return state;
    }
}

export default reducer;