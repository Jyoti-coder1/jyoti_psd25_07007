import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import React, { useContext, useCallback, useMemo } from "react";
import LocationContext from "../context/LocationContext";

const containerStyle = {
    width: "100%",
    height: "500px",
};

function MapComponent() {
    const { state } = useContext(LocationContext);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
        libraries:["places"],
    });
    const center = useMemo(
        () => state.currentLocation || { lat: 28.6139, lng: 77.2090 }, // Delhi fallback
        [state.currentLocation]
    );
    const onMapClick = useCallback((e) => {
        console.log("Clicked at:", e.latLng.lat(), e.latLng.lng());
    }, []);
    if (!isLoaded) return <p>Loading Map...</p>;
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            onClick={onMapClick}
        >
            {state.currentLocation && <Marker position={state.currentLocation} />}
            {state.destination && <Marker position={state.destination} />}
            {state.directions && <DirectionsRenderer directions={state.directions} />}
        </GoogleMap>
    );
}
export default React.memo(MapComponent);