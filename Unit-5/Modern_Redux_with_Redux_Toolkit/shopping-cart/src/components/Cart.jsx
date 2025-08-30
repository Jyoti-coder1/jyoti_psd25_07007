import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../redux/cartSlice";

function Cart() {
    const items = useSelector(state => state.cart.items);
    const total = useSelector(state => state.cart.total);
    const dispatch = useDispatch();
    return (
        <div className="cart">
            <h2>Shopping Cart</h2>
            {items.length === 0 ? <p>No items in cart.</p> : null}
            {items.map(item => (
                <div key={item.id} className="cart-item">
                    <p>{item.name} - ₹{item.price}</p>
                    <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
                </div>
            ))}
            <h3>Total: ₹{total}</h3>
        </div>
    );
}
export default Cart;