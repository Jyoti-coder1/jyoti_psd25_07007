import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="app-container">
      <h1>Simple Shopping Cart</h1>
      <div className="content">
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}
export default App;
