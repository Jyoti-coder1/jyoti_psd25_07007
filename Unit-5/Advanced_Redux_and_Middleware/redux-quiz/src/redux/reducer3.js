import { UPDATE_SCORE, RESET_SCORE } from "./actionTypes";

const initialState = {
    score: 0,
};

export const reducer3 = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SCORE:
            return { ...state, score: state.score + action.payload };
        case RESET_SCORE:
            return initialState;
        default:
            return state;
    }
};

export const updateScore = (value) => ({ type: UPDATE_SCORE, payload: value });
export const resetScore = () => ({ type: RESET_SCORE });