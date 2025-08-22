import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Profile() {
    const { user } = useContext(UserContext);

    useEffect(() => {
        console.log("Profile component mounted");
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
        </div>
    );
}