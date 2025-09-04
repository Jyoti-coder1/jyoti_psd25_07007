import { useForm } from "../hooks/useForm";
import "../App.css";

const Form = () => {
    const { values, handleChange, resetForm } = useForm({
        username: "",
        email: ""
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Submitted: ${values.username}, ${values.email}`);
        resetForm();
    };
    return (
        <div className="form-container">
            <h2>Custom Hook Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    placeholder="Enter username"
                />
                <input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
export default Form;