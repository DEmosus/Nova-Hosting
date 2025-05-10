// Sample product data
const products = [
  {
    id: 1,
    name: "Nova T-Shirt",
    description: "Soft cotton NovaHost branded T-shirt.",
    price: 25.00,
    image: "images/t-shirt.png"
  },
  {
    id: 2,
    name: "Nova Mug",
    description: "Ceramic mug with NovaHost logo.",
    price: 15.00,
    image: "images/mug.png"
  },
  {
    id: 3,
    name: "Nova Mouse Pad",
    description: "Smooth surface mouse pad with vibrant Nova branding.",
    price: 10.00,
    image: "images/mouse-Pad.png"
  },
  {
    id: 4,
    name: "Nova Sticker Pack",
    description: "Pack of 5 NovaHost stickers for your devices.",
    price: 5.00,
    image: "images/stickers.png"
  }
];

// Render products
function displayProducts() {
  const grid = document.getElementById("productGrid");

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p class="price">$${product.price.toFixed(2)}</p>
        <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Add product to cart
function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("novaCart")) || [];
  const product = products.find(p => p.id === productId);

  if (!product) {
    alert("Product not found.");
    return;
  }

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("novaCart", JSON.stringify(cart));
  alert(`${product.name} added to cart.`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("novaCart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cartTotal");
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
  }
}


// Initialize
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updateCartCount(); 
});