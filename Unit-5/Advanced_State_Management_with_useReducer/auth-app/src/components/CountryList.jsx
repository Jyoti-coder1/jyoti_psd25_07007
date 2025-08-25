function CountryList({ list }) {
    return (
        <ul>
            {list.map((c, i) => (
                <li key={i}>{c.country}</li>
            ))}
        </ul>
    );
}

export default CountryList;