document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("checkoutForm");
  const reviewList = document.getElementById("reviewList");

  // Attempt to fetch data from localStorage (from start-hosting)
  const userData = JSON.parse(localStorage.getItem("novaUserData"));

  if (userData) {
    reviewList.innerHTML = `
      <li><strong>Name:</strong> ${userData.name}</li>
      <li><strong>Email:</strong> ${userData.email}</li>
      <li><strong>Domain:</strong> ${userData.domain}</li>
      <li><strong>Plan:</strong> ${userData.plan}</li>
      <li><strong>Template:</strong> ${userData.template}</li>
    `;
  } else {
    reviewList.innerHTML = `<li style="color: red;">No user data found.</li>`;
  }

  // Simple payment validation (just client-side for now)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cardNumber = form.card.value.trim();
    const expiry = form.expiry.value.trim();
    const cvc = form.cvc.value.trim();

    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Card number must be 16 digits.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Expiry must be in MM/YY format.");
      return;
    }
    if (!/^\d{3,4}$/.test(cvc)) {
      alert("CVV must be 3 or 4 digits.");
      return;
    }

    // if (!cardNumber || !expiry || !cvc) {
    //   alert('Please fill in all payment fields.');
    //   return;
    // }

    // Optional: Add basic format checks here

    // Simulate successful payment
    localStorage.setItem("novaPaymentComplete", "true");
    // alert("Payment successful! Redirecting to confirmation...");
    window.location.href = "../confirmation/index.html";
  });
});
