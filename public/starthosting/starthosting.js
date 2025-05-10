document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("selected-plan");
  const selectedPlan = localStorage.getItem("selectedPlan") || "pro";

  // 1. Check the matching radio button on page load
  const radioToSelect = document.querySelector(`input[name="plan"][value="${selectedPlan}"]`);
  if (radioToSelect) {
    radioToSelect.checked = true;
  }

  // 2. Update localStorage when any plan is selected
  const planRadios = document.querySelectorAll('input[name="plan"]');
  planRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      const newPlan = e.target.value;
      localStorage.setItem("selectedPlan", newPlan);
      updatePlanDetails(newPlan);
    });
  });

  // 3. Plan details data
  const plans = {
    basic: {
      name: "Basic Plan",
      price: "$5/month",
      features: ["1 Website", "10 GB SSD Storage", "Free SSL"]
    },
    pro: {
      name: "Pro Plan",
      price: "$15/month",
      features: ["10 Websites", "50 GB SSD Storage", "Free SSL, CDN & Backups", "Priority Support"]
    },
    enterprise: {
      name: "Enterprise Plan",
      price: "$29/month",
      features: ["Unlimited Websites", "200 GB SSD", "Dedicated Support", "Advanced Security", "Free SSL, CDN, Backups"]
    }
  };

  // 4. Function to update plan details box
  function updatePlanDetails(planKey) {
    if (plans[planKey]) {
      const plan = plans[planKey];
      container.innerHTML = `
        <h4>${plan.name}</h4>
        <p class="price">${plan.price}</p>
        <ul>
          ${plan.features.map(feature => `<li>${feature}</li>`).join("")}
        </ul>
      `;
    } else {
      container.innerHTML = `<p>No plan selected. Please go back and choose one.</p>`;
    }
  }

  // 5. Initial render of selected plan
  updatePlanDetails(selectedPlan);
});
