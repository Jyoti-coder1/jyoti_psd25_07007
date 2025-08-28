import axios from "axios";

export const fetchMatches = () => async (dispatch) => {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    try {
        const res = await axios.get(
            "https://jsonmock.hackerrank.com/api/football_matches?page=2"
        );
        dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: res.data.data });
    } catch (error) {
        dispatch({ type: "FETCH_MATCHES_FAILURE" });
    }
};

export const addFavorite = (match) => ({ type: "ADD_FAVORITE", payload: match });
export const removeFavorite = (id) => ({ type: "REMOVE_FAVORITE", payload: id });
export const setSearch = (query) => ({ type: "SET_SEARCH", payload: query });
export const setFilters = (filters) => ({ type: "SET_FILTERS", payload: filters });
export const addNotification = (message) => ({ type: "ADD_NOTIFICATION", payload: message });