const products = [
  {
    id: 1,
    name: "Burger 1",
    description: "This is product 1",
    price: 10.99,
    rating: 4.5,
    stock: 20,
    image: "images/burger1.png",
    quantity: 0
  },
  {
    id: 2,
    name: "Burger 2",
    description: "This is product 2",
    price: 15.99,
    rating: 4.0,
    stock: 10,
    image: "images/burger2.png",
    quantity: 0
  },
  {
    id: 3,
    name: "Burger 3",
    description: "This is product 2",
    price: 15.99,
    rating: 4.0,
    stock: 10,
    image: "images/burger3.png",
    quantity: 0
  },
  {
    id: 4,
    name: "Fries 1",
    description: "This is product Fries 1",
    price: 5.99,
    rating: 4.2,
    stock: 20,
    image: "images/fries1.png",
    quantity: 0
  }
];

function renderCatalog() {
  const container = document.getElementById("catalog");
  container.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${product.image}" onerror="this.src='https://via.placeholder.com/130?text=${product.name}'" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <div class="details">
        <p>Price : $${product.price.toFixed(2)}</p>
        <p class="rating">Rating : ${product.rating} ★</p>
        <p>Stocks : ${product.stock}</p>
      </div>
      <div class="controls">
        <button class="btn btn-add" onclick="changeQuantity(${index}, 1)">+</button>
        <span class="qty-display" id="qty-${index}">${product.quantity}</span>
        <button class="btn btn-sub" onclick="changeQuantity(${index}, -1)">-</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function changeQuantity(index, change) {
  const item = products[index];

  if (change === 1 && item.quantity >= item.stock) {
    alert(`Cannot add more. Only ${item.stock} in stock!`);
    return;
  }

  if (item.quantity + change >= 0) {
    item.quantity += change;
    document.getElementById(`qty-${index}`).textContent = item.quantity;
    updateCartSummary();
  }
}

function updateCartSummary() {
  let totalItems = 0;
  let totalPrice = 0;

  products.forEach(p => {
    totalItems += p.quantity;
    totalPrice += p.quantity * p.price;
  });

  document.getElementById("total-items").textContent = totalItems;
  document.getElementById("total-price").textContent = `$${totalPrice.toFixed(2)}`;
}

function checkout() {
  const selected = products.filter(p => p.quantity > 0);
  if (selected.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert(`Order Placed! Total Items: ${document.getElementById("total-items").textContent}`);
}

document.addEventListener("DOMContentLoaded", renderCatalog);