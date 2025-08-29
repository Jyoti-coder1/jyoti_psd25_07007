import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
} from "./actionTypes";

const initialState = {
    isAuth: false,
    token: null,
    loading: false,
    error: null,
};

export const reducer1 = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };

        case LOGIN_SUCCESS:
            return { ...state, loading: false, isAuth: true, token: action.payload };

        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };

        case LOGOUT:
            return { ...state, isAuth: false, token: null };

        default:
            return state;
    }
};

export const loginUser = (email, password) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
        const res = await fetch("https://reqres.in/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            dispatch({ type: LOGIN_SUCCESS, payload: data.token });
        } else {
            dispatch({ type: LOGIN_FAILURE, payload: data.error });
        }
    } catch (err) {
        dispatch({ type: LOGIN_FAILURE, payload: err.message });
    }
};

export const logoutUser = () => ({ type: LOGOUT });