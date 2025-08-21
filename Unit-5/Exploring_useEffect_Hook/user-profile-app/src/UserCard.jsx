import "./App.css";
function UserCard({ name, email, city }) {
    return (
        <div className="user-card">
            <h3>{name}</h3>
            <p>Email: {email}</p>
            <p>City: {city}</p>
        </div>
    );
}
export default UserCard;