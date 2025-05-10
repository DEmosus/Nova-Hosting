document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".select-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const template = button.closest(".template-card").dataset.template;

      // Load or initialize user data
      const data = JSON.parse(localStorage.getItem("novaUserData")) || {};

      data.template = template;
      localStorage.setItem("novaUserData", JSON.stringify(data));

      alert(`"${template}" template selected! Redirecting to confirmation...`);
      window.location.href = "../confirmation/index.html";
    });
  });
});
