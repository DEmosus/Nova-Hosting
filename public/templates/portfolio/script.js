// Simple contact form handler
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! 🚀");
    form.reset();
  });
});
