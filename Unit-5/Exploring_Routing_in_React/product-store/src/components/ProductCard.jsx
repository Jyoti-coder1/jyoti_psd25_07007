import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <div className="product-card">
            <img src={product.thumbnail} alt={product.title} width="100%" />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <Link to={`/product/${product.id}`}>View Details</Link>
        </div>
    );
}

export default ProductCard;