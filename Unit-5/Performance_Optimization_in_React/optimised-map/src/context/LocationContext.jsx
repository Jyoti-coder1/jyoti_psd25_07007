import { createContext, useReducer } from "react";

const LocationContext = createContext();
const initialState = {
    currentLocation: null,
    destination: null,
};
function reducer(state, action) {
    switch (action.type) {
        case "SET_CURRENT":
            return { ...state, currentLocation: action.payload };
        case "SET_DESTINATION":
            return { ...state, destination: action.payload };
        default:
            return state;
    }
}
export const LocationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <LocationContext.Provider value={{ state, dispatch }}>
            {children}
        </LocationContext.Provider>
    );
};
export default LocationContext;