import { createContext } from "react";
import { useReducer } from "react";


export const CollegeContext = createContext();

const initialState = {
    name: "",
    establishment_year: "",
    address: {
        building: "",
        street: "",
        city: "",
        state: "",
        locality: {
            pinCode: "",
            landmark: ""
        },
        coordinates: {
            latitude: "",
            longitude: ""
        }
    },
    courses_offered: []
};

function reducer(state, action) {
    switch (action.type) {
        case "update":
            return { ...state, [action.field]: action.value };

        case "update_nested":
            return {
                ...state,
                [action.parent]: {
                    ...state[action.parent],
                    [action.field]: action.value
                }
            };

        case "update_deep_nested":
            return {
                ...state,
                address: {
                    ...state.address,
                    [action.parent]: {
                        ...state.address[action.parent],
                        [action.field]: action.value
                    }
                }
            };

        case "update_coordinates":
            return {
                ...state,
                address: {
                    ...state.address,
                    coordinates: {
                        ...state.address.coordinates,
                        [action.field]: action.value
                    }
                }
            };

        case "update_courses":
            return {
                ...state,
                courses_offered: action.value.split(",").map((c) => c.trim())
            };

        case "reset":
            return initialState;

        default:
            throw new Error("invalid action type");
    }
}

export function CollegeProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CollegeContext.Provider value={{ state, dispatch }}>
            {children}
        </CollegeContext.Provider>
    );
}