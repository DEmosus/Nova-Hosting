document.addEventListener("DOMContentLoaded", () => {
  // --- PLAN DISPLAY LOGIC ---
  const selectedPlan = localStorage.getItem("selectedPlan") || "pro";
  const planDisplay = document.getElementById("planDisplay");
  const planInput = document.querySelector('input[name="plan"]');

  const plans = {
    basic: {
      name: "Basic Plan",
      price: "$5/month",
      features: ["1 Website", "10 GB SSD Storage", "Free SSL"],
    },
    pro: {
      name: "Pro Plan",
      price: "$15/month",
      features: [
        "10 Websites",
        "50 GB SSD Storage",
        "Free SSL, CDN & Backups",
        "Priority Support",
      ],
    },
    enterprise: {
      name: "Elite Plan",
      price: "$30/month",
      features: [
        "Unlimited Websites",
        "200 GB SSD Storage",
        "All Pro Features + Dedicated IP",
        "24/7 VIP Support",
      ],
    },
  };

  const plan = plans[selectedPlan.toLowerCase()];
  if (plan) {
    planDisplay.innerHTML = `
      <h4>${plan.name}</h4>
      <p class="price">${plan.price}</p>
      <ul>${plan.features.map((f) => `<li>${f}</li>`).join("")}</ul>
    `;
    if (planInput) planInput.value = plan.name;
  } else {
    planDisplay.innerHTML = `<p>No plan selected.</p>`;
  }

  // --- FORM SUBMISSION LOGIC ---
  const form = document.getElementById("setupForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const domain = form.domain.value.trim();
    const plan = form.plan.value;
    const template = form.querySelector('input[name="template"]:checked')?.value;

    if (!name || !email || !domain || !plan || !template) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = { name, email, domain, plan, template };

    // Save to localStorage
    localStorage.setItem("novaUserData", JSON.stringify(formData));
    localStorage.setItem("novaSelectedTemplate", template);

    // Show toast
    const toast = document.getElementById("toast");
    const toastProgress = document.getElementById("toastProgress");
    toast.classList.add("show");
    toastProgress.style.animation = "toast-progress 2s linear forwards";

    // Delay + redirect
    setTimeout(() => {
      switch (template) {
        case "ecommerce":
          window.location.href = "../ecommerce/checkout.html";
          break;
        case "template1":
        case "template2":
          alert("This template is not available yet. Please choose Online Store.");
          break;
        default:
          alert("Invalid template selected.");
      }
    }, 2000);

    // Backend submission (optional)
    try {
      const response = await fetch("/api/start-hosting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Hosting setup submitted:", result);
      } else {
        console.warn(result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
});
