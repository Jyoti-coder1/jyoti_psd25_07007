function createInventoryItem(name, category, price) {
    return {
        name,
        category,
        price,
        describeItem() {
            console.log(`Item: ${this.name}, Category: ${this.category}, Price: ${this.price}`);
        }
    };
}
function addItemDiscount(inventoryItem, discountPercent) {
    const discountedPrice = inventoryItem.price - (inventoryItem.price * discountPercent / 100);
    return {
        ...inventoryItem,
        discountedPrice,
        applyDiscount() {
            console.log(`Discounted Price for ${this.name}: ${this.discountedPrice}`);
        }
    };
}
const item = createInventoryItem("Laptop", "Electronics", 1500);
item.describeItem(); 

const discountedItem = addItemDiscount(item, 10);
discountedItem.applyDiscount();