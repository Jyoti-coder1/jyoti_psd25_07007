// pages/ProductDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }, [id]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="product-detail">
            <Link className="back-line" to="/">⬅ Back</Link>
            <h1>{product.title}</h1>
            <img src={product.thumbnail} alt={product.title} width="300px" />
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>{product.description}</p>
        </div>
    );
}

export default ProductDetail;