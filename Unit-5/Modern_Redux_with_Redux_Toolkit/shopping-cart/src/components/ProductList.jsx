import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";

const products = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Headphones", price: 2000 },
    { id: 3, name: "Mouse", price: 800 },
];

function ProductList() {
    const dispatch = useDispatch();
    return (
        <div className="product-list">
            <h2>Products</h2>
            {products.map(product => (
                <div key={product.id} className="product">
                    <p>{product.name} - ₹{product.price}</p>
                    <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
                </div>
            ))}
        </div>
    );
}
export default ProductList;