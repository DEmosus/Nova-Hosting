document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.get-started').forEach(button => {
    button.addEventListener('click', () => {
      const plan = button.getAttribute('data-plan');
      localStorage.setItem('selectedPlan', plan);
    });
  });
});
