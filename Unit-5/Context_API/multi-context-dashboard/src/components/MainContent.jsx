import React from "react";

function MainContent() {
    const products = ["Product 1", "Product 2", "Product 3", "Product 4"];

    return (
        <main className="main">
            <div className="grid">
                {products.map((product, i) => (
                    <div key={i} className="card">
                        {product}
                    </div>
                ))}
            </div>
        </main>
    );
}

export default MainContent;