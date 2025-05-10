document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cartContainer");
  const cartTotal = document.getElementById("cartTotal");
  const cartSummary = document.querySelector(".cart-summary");

  let cart = JSON.parse(localStorage.getItem("novaCart")) || [];

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("novaCart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById("cartTotal");
    if (cartCountEl) {
      cartCountEl.textContent = totalItems;
    }
  }

  function updateCart() {
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartSummary.style.display = "none";
      return;
    }

    cartSummary.style.display = "flex";

    let total = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
        </div>
        <div class="cart-item-actions">
          <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input" />
          <button data-index="${index}" class="remove-btn">Remove</button>
        </div>
      `;
      cartContainer.appendChild(div);
    });

    // Update totals after calculation
    cartTotal.textContent = `$${total.toFixed(2)}`;
    const amountEl = document.getElementById("cartTotalAmount");
    if (amountEl) {
      amountEl.textContent = `$${total.toFixed(2)}`;
    }

    attachListeners();
  }

  function attachListeners() {
    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("novaCart", JSON.stringify(cart));
        updateCart();
      });
    });

    document.querySelectorAll(".quantity-input").forEach((input) => {
      input.addEventListener("change", () => {
        const index = input.dataset.index;
        const newQty = parseInt(input.value);
        if (newQty > 0) {
          cart[index].quantity = newQty;
          localStorage.setItem("novaCart", JSON.stringify(cart));
          updateCart();
        }
      });
    });
  }

  updateCart();
  updateCartCount();
});
