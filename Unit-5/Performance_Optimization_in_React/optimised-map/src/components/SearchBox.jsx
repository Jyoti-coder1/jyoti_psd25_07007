import React, { useContext, useRef } from "react";
import LocationContext from "../context/LocationContext";

function SearchBox({ label, type }) {
    const { dispatch } = useContext(LocationContext);
    const inputRef = useRef(null);

    const handleSearch = () => {
        const value = inputRef.current.value;
        if (!value) return;

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: value }, (results, status) => {
            if (status === "OK") {
                const location = results[0].geometry.location;
                dispatch({
                    type: type === "current" ? "SET_CURRENT" : "SET_DESTINATION",
                    payload: { lat: location.lat(), lng: location.lng() },
                });
            }
        });
    };

    return (
        <div className="search-box">
            <input ref={inputRef} type="text" placeholder={label} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}
export default React.memo(SearchBox);