import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Settings() {
    const { user, setUser } = useContext(UserContext);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const handleSubmit = (e) => {
        e.preventDefault();
        setUser({ name, email });
    };

    return (
        <div>
            <h2>Update Settings</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}