import axios from "axios";

export const fetchCoffee = (sortBy = "") => {
    return async (dispatch) => {
        dispatch({ type: "FETCH_COFFEE_REQUEST" });

        try {
            let url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee`;
            if (sortBy) {
                url += `?sort=price&order=${sortBy}`;
            }

            const res = await axios.get(url);
            dispatch({ type: "FETCH_COFFEE_SUCCESS", payload: res.data.data });
        } catch (error) {
            dispatch({ type: "FETCH_COFFEE_FAILURE", payload: error.message });
        }
    };
};