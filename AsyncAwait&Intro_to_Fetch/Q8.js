async function fetchAndDisplayProducts() {
    const apiUrl = "https://fakestoreapi.com/products";
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const products = await response.json();
        console.log("All Products:\n");
        products.forEach((product, index) => {
            console.log(`Product ${index + 1}`);
            console.log(`Title: ${product.title}`);
            console.log(`Price: $${product.price}`);
            console.log(`Image: ${product.image}`);
            console.log(`Button: [View Details]\n`);
        });
        const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
        console.log(`\n🧮 Total Price of All Products: $${totalPrice.toFixed(2)}`);
    }
    catch (error) {
        console.error("❌ Failed to fetch products. Please try again later.");
        console.error("Error Details:", error.message);
    }
}
fetchAndDisplayProducts();