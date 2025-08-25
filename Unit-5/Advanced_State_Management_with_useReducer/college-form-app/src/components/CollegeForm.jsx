import { useContext } from "react";
import { useState } from "react";
import { CollegeContext } from "../context/CollegeContext";
import "../App.css";

export default function CollegeForm() {
    const { state, dispatch } = useContext(CollegeContext);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        try {
            console.log("Submitted College:", state);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="form-container">
            <h2>College Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Basic Info */}
                <input type="text" placeholder="College Name" value={state.name} onChange={(e) => dispatch({ type: "update", field: "name", value: e.target.value })} />
                <input type="number" placeholder="Establishment Year" value={state.establishment_year} onChange={(e) =>
                    dispatch({
                        type: "update", field: "establishment_year", value: e.target.value
                    })
                } />

                {/* Address */}
                <input type="text" placeholder="Building" value={state.address.building} onChange={(e) =>
                    dispatch({
                        type: "update_nested",
                        parent: "address",
                        field: "building",
                        value: e.target.value
                    })
                } />
                <input type="text" placeholder="Street" value={state.address.street} onChange={(e) =>
                    dispatch({
                        type: "update_nested",
                        parent: "address",
                        field: "street",
                        value: e.target.value
                    })
                } />
                <input type="text" placeholder="City" value={state.address.city} onChange={(e) =>
                    dispatch({
                        type: "update_nested",
                        parent: "address",
                        field: "city",
                        value: e.target.value
                    })
                } />
                <input type="text" placeholder="State" value={state.address.state} onChange={(e) =>
                    dispatch({
                        type: "update_nested",
                        parent: "address",
                        field: "state",
                        value: e.target.value
                    })
                } />
                <input type="text" placeholder="Pincode" value={state.address.locality.pinCode} onChange={(e) =>
                    dispatch({
                        type: "update_deep_nested",
                        parent: "locality",
                        field: "pinCode",
                        value: e.target.value
                    })
                } />
                <input type="text" placeholder="Landmark" value={state.address.locality.landmark} onChange={(e) =>
                    dispatch({
                        type: "update_deep_nested",
                        parent: "locality",
                        field: "landmark",
                        value: e.target.value
                    })
                } />
                <input type="text" placeholder="Latitude" value={state.address.coordinates.latitude} onChange={(e) =>
                    dispatch({
                        type: "update_coordinates",
                        field: "latitude",
                        value: e.target.value
                    })
                }/>
                <input type="text" placeholder="Longitude" value={state.address.coordinates.longitude} onChange={(e) =>
                    dispatch({
                        type: "update_coordinates",
                        field: "longitude",
                        value: e.target.value
                    })
                } />

                {/* Courses */}
                <input type="text" placeholder="Courses Offered (comma separated)" value={state.courses_offered.join(", ")} onChange={(e) =>
                    dispatch({ type: "update_courses", value: e.target.value })
                } />

                <button type="submit">Submit</button>
                <button type="button" onClick={() => {
                    dispatch({ type: "reset" });
                    setError("");
                }} >
                Reset
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            {/* Display Submitted Data */}
            <div className="output-box">
                <h3>College Details</h3>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </div>
        </div>
    );
}