import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.email && form.password) {
            login({ email: form.email });
            navigate("/search");
        }
        else {
            error("All fields required!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            <button type="submit">Login</button>
        </form>
    );
}
export default Login;