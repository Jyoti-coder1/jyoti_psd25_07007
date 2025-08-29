import axios from "axios";
import { QUIZ_REQUEST, QUIZ_SUCCESS, QUIZ_FAILURE } from "./actionTypes";

const initialState = {
    questions: [],
    loading: false,
    error: false,
};

export const reducer2 = (state = initialState, action) => {
    switch (action.type) {
        case QUIZ_REQUEST:
            return { ...state, loading: true, error: false };
        case QUIZ_SUCCESS:
            return { ...state, loading: false, questions: action.payload };
        case QUIZ_FAILURE:
            return { ...state, loading: false, error: true };
        default:
            return state;
    }
};

export const fetchQuiz = () => async (dispatch) => {
    dispatch({ type: QUIZ_REQUEST });
    try {
        const res = await axios.get(
            "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz"
        );
        dispatch({ type: QUIZ_SUCCESS, payload: res.data.data });
    } catch (err) {
        dispatch({ type: QUIZ_FAILURE });
    }
};