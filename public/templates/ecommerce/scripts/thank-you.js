document.addEventListener("DOMContentLoaded", () => {
  const nameEl = document.getElementById("userName");
  const totalEl = document.getElementById("totalPaid");

  const checkoutInfo = JSON.parse(localStorage.getItem("novaCheckout"));

  if (!checkoutInfo || typeof checkoutInfo !== "object") {
    nameEl.textContent = "Customer";
    totalEl.textContent = "0.00";
    return;
  }

  const name = checkoutInfo.name || "Customer";
  const total = typeof checkoutInfo.total === "number" ? checkoutInfo.total : 0;

  nameEl.textContent = name;
  totalEl.textContent = total.toFixed(2);

  // Optionally display email or address if needed
  // console.log("Email:", checkoutInfo.email);
  // console.log("Address:", checkoutInfo.address);

  localStorage.removeItem("novaCheckout");
});
