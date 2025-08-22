import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import FilterSort from "../components/FilterSort";

function Home() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data.products);
                setFilteredProducts(data.products);
            });
    }, []);

    // Filter & Sort
    useEffect(() => {
        let temp = [...products];

        if (category !== "all") {
            temp = temp.filter((p) => p.category === category);
        }

        if (sortOrder === "low") {
            temp.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high") {
            temp.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(temp);
    }, [category, sortOrder, products]);

    return (
        <div className="filter-sort">
            <h1>Product Store</h1>
            <FilterSort
                category={category}
                setCategory={setCategory}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            <div className="product-gird">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default Home;