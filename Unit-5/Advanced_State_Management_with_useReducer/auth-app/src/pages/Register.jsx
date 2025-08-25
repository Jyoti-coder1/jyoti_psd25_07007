import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.email && form.password) {
            alert("Registered Successfully! Please Login.");
            navigate("/login");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Register</button>
        </form>
    );
}
export default Register;