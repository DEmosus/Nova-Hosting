document.addEventListener("DOMContentLoaded", () => {
  const itemsContainer = document.getElementById("orderItems");
  const grandTotalEl = document.getElementById("orderTotal");
  const form = document.getElementById("checkoutForm");

  const cartItems = JSON.parse(localStorage.getItem("novaCart")) || [];

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    alert("Your cart is empty. Please add items before checking out.");
    window.location.href = "cart.html"; // More appropriate than index.html
    return;
  }

  let total = 0;
  itemsContainer.innerHTML = "";

  cartItems.forEach(item => {
    if (!item.name || typeof item.price !== "number" || !item.quantity) return;

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - $${itemTotal.toFixed(2)}`;
    itemsContainer.appendChild(li);
  });

  grandTotalEl.textContent = total.toFixed(2);

  form.addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const card = document.getElementById("card").value.trim();

    const errors = [];

    if (!name) errors.push("Name is required.");
    if (!email || !email.includes("@")) errors.push("Valid email is required.");
    if (!address) errors.push("Address is required.");
    if (!/^\d{12,16}$/.test(card)) errors.push("Card must be 12–16 digits.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    localStorage.setItem("novaCheckout", JSON.stringify({ name, email, address, total }));

    localStorage.removeItem("novaCart");
    window.location.href = "thank-you.html";
  });
});
