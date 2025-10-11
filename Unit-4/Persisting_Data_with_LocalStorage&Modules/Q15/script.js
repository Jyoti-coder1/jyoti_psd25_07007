let currentUser = "";

document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("usernameInput").value.trim();
    if (!username) return alert("Enter a valid username");

    currentUser = username;
    document.getElementById("currentUser").innerText = username;
    document.getElementById("login").style.display = "none";
    document.getElementById("cartSection").style.display = "block";

    if (!localStorage.getItem("carts")) {
        localStorage.setItem("carts", JSON.stringify({}));
    }
    loadCart();
});

document.getElementById("addItemBtn").addEventListener("click", () => {
    const itemName = document.getElementById("itemName").value.trim();
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseInt(document.getElementById("quantity").value);

    if (!itemName || isNaN(price) || isNaN(quantity) || quantity <= 0 || price <= 0) {
        return alert("Enter valid item details");
    }

    const carts = JSON.parse(localStorage.getItem("carts"));
    const userCart = carts[currentUser] || [];

    const index = userCart.findIndex(item => item.itemName === itemName);
    if (index >= 0) {
        userCart[index].quantity += quantity;
    }
    else {
        userCart.push({ itemName, price, quantity });
    }

    carts[currentUser] = userCart;
    localStorage.setItem("carts", JSON.stringify(carts));
    loadCart();

    document.getElementById("itemName").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantity").value = "";
});

function loadCart() {
    const carts = JSON.parse(localStorage.getItem("carts"));
    const userCart = carts[currentUser] || [];
    const tbody = document.querySelector("#cartTable tbody");
    tbody.innerHTML = "";

    let total = 0;
    userCart.forEach((item, index) => {
        const tr = document.createElement("tr");
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        tr.innerHTML = `
            <td>${item.itemName}</td>
            <td>₹${item.price}</td>
            <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)"></td>
            <td>₹${itemTotal}</td>
            <td><button onclick="removeItem(${index})">Remove</button></td>
        `;
        tbody.appendChild(tr);
    });

    document.getElementById("totalCost").innerText = total;
}

function updateQuantity(index, newQty) {
    newQty = parseInt(newQty);
    if (isNaN(newQty) || newQty <= 0) return alert("Invalid quantity");
    const carts = JSON.parse(localStorage.getItem("carts"));
    carts[currentUser][index].quantity = newQty;
    localStorage.setItem("carts", JSON.stringify(carts));
    loadCart();
}

function removeItem(index) {
    const carts = JSON.parse(localStorage.getItem("carts"));
    carts[currentUser].splice(index, 1);
    localStorage.setItem("carts", JSON.stringify(carts));
    loadCart();
}