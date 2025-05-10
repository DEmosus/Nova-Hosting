document.addEventListener("DOMContentLoaded", () => {
  const summaryList = document.getElementById("summaryList");
  const data = JSON.parse(localStorage.getItem("novaUserData"));

  function sanitize(input) {
    const div = document.createElement("div");
    div.textContent = input;
    return div.innerHTML;
  }

  if (data && data.name && data.email && data.domain && data.plan && data.template) {
    summaryList.innerHTML = `
      <li><strong>Name:</strong> ${sanitize(data.name)}</li>
      <li><strong>Email:</strong> ${sanitize(data.email)}</li>
      <li><strong>Domain:</strong> ${sanitize(data.domain)}</li>
      <li><strong>Plan:</strong> ${sanitize(data.plan)}</li>
      <li><strong>Template:</strong> ${sanitize(data.template)}</li>
    `;
    
    // Redirect to thank-you page after 6 seconds
    setTimeout(() => {
      window.location.href = "../thank-you/index.html";
    }, 6000);

  } else {
    summaryList.innerHTML = `<li>⚠️ Missing confirmation data. Please <a href="../start/index.html">return to setup</a>.</li>`;
  }

  document.getElementById("clearDataBtn").addEventListener("click", () => {
    localStorage.removeItem("novaUserData");
    alert("Your saved hosting setup data has been cleared.");
    location.reload();
  });
});
