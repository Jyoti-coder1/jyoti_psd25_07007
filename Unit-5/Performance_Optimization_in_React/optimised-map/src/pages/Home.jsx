import MapComponent from "../components/MapComponent";
import SearchBox from "../components/SearchBox";
import RouteInfo from "../components/RouteInfo";

function Home() {
    return (
        <div>
            <h1>Optimized Map Application</h1>
            <div className="search-container">
                <SearchBox label="Enter Current Location" type="current" />
                <SearchBox label="Enter Destination" type="destination" />
            </div>
            <MapComponent />
            <RouteInfo />
        </div>
    );
}
export default Home;