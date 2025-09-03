import useForm from "../hooks/useForm";

function Form() {
    const { values, handleChange, resetForm }
    = useForm({
        username: "",
        email: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Username: ${values.username}, Email: ${values.email}`);
        resetForm();
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Custom Hook Form</h2>
            <input type="text" name="username" placeholder="Enter username" value={values.username} onChange={handleChange} />
            <input type="email" name="email" placeholder="Enter email" value={values.email} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}
export default Form;