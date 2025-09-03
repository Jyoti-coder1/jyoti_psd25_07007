import React, { useContext, useEffect } from "react";
import LocationContext from "../context/LocationContext";

function RouteInfo() {
    const { state, dispatch } = useContext(LocationContext);
    useEffect(() => {
        if (state.currentLocation && state.destination) {
            const directionsService = new window.google.maps.DirectionsService();
            directionsService.route(
                {
                    origin: state.currentLocation,
                    destination: state.destination,
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                    if (status === "OK") {
                        dispatch({ type: "SET_DIRECTIONS", payload: result });
                    }
                }
            );
        }
    }, [state.currentLocation, state.destination, dispatch]);
    return (
        <div className="route-info">
            {state.destination ? <p>Route calculated</p> : <p>Enter a destination</p>}
        </div>
    );
}
export default React.memo(RouteInfo);