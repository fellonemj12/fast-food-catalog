const products = [
  {
    name: "Western Burger",
    description: "Classic beef burger with fresh lettuce and cheese",
    price: 13.99,
    rating: 4.8,
    votes: 12,
    stock: 29,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    quantity: 0,
    reviews: ["Very juicy and cheesy!", "Best burger in town."]
  },
  {
    name: "Italian Burger",
    description: "Double patty burger with special sauce",
    price: 15.99,
    rating: 4.0,
    votes: 8,
    stock: 26,
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500",
    quantity: 0,
    reviews: ["Love the special sauce."]
  },
  {
    name: "American Burger",
    description: "Crispy chicken burger with bacon",
    price: 15.99,
    rating: 4.0,
    votes: 10,
    stock: 23,
    image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500",
    quantity: 0,
    reviews: ["Crispy bacon is awesome."]
  },
  {
    name: "Classic Fries",
    description: "Golden crispy French fries",
    price: 7.99,
    rating: 4.7,
    votes: 15,
    stock: 30,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500",
    quantity: 0,
    reviews: ["Super crispy and hot."]
  }
];

function renderCatalog() {
  const container = document.getElementById("catalog");
  container.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "card";

    // Generate 5 yellow interactive stars
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      const isRated = i <= Math.round(product.rating) ? 'rated' : '';
      starsHTML += `<i class="fa-solid fa-star ${isRated}" onclick="rateProduct(${index}, ${i})"></i>`;
    }

    // Build review list HTML
    let reviewsHTML = '';
    if (product.reviews && product.reviews.length > 0) {
      product.reviews.forEach(rev => {
        reviewsHTML += `<div class="review-item">• ${rev}</div>`;
      });
    } else {
      reviewsHTML = `<div class="review-item" style="color: #999;">No reviews yet.</div>`;
    }

    card.innerHTML = `
      <img src="${product.image}" onerror="this.src='https://via.placeholder.com/130?text=${product.name}'" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="description">${product.description}</p>
      <div class="details">
        <p>Price : $${product.price.toFixed(2)}</p>
        <div class="star-rating">
          ${starsHTML}
        </div>
        <p class="rating-text" onclick="addReview(${index})" title="Click to write a review">
          Rating : <span id="rating-val-${index}">${product.rating}</span> (${product.votes} votes) ✍️
        </p>
        <div class="reviews-container">
          ${reviewsHTML}
        </div>
        <p style="margin-top: 6px;">Stocks : ${product.stock}</p>
      </div>
      <div class="controls">
        <button class="btn btn-sub" onclick="changeQuantity(${index}, -1)">-</button>
        <span class="qty-display" id="qty-${index}">${product.quantity}</span>
        <button class="btn btn-add" onclick="changeQuantity(${index}, 1)">+</button>
      </div>
    `;

    container.appendChild(card);
  });
}

function rateProduct(index, starValue) {
  const item = products[index];
  item.votes += 1;
  item.rating = parseFloat(((item.rating * (item.votes - 1) + starValue) / item.votes).toFixed(1));
  renderCatalog();
}

function addReview(index) {
  const item = products[index];
  const userReview = prompt(`Write your review for ${item.name}:`);
  if (userReview && userReview.trim() !== "") {
    item.reviews.unshift(userReview.trim());
    renderCatalog();
  }
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

  // Deduct stocks based on ordered quantities and reset cart quantities
  products.forEach(p => {
    if (p.quantity > 0) {
      p.stock -= p.quantity; // Subtract ordered quantity from stock
      p.quantity = 0;        // Reset item quantity back to 0
    }
  });

  alert("Order Placed Successfully! Stock levels have been updated.");

  // Refresh the catalog display and bottom cart bar totals
  renderCatalog();
  updateCartSummary();
}

document.addEventListener("DOMContentLoaded", renderCatalog);