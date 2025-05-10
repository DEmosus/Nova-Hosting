# NovaHost 🚀

NovaHost is a modern, responsive web hosting platform that provides users with customizable website templates (Portfolio, Business, Blog), e-commerce functionality, and dynamic form handling. The platform is built with HTML, CSS, JavaScript for the frontend, and Node.js + Express on the backend.

---

## 🌐 Live Demo



---

## 📁 Project Structure

NovaHost/
├── public/ # Frontend (served statically)
│ ├── assets/ # Images, fonts, and shared assets
│ ├── ecommerce/ # E-commerce pages (cart, checkout)
│ ├── templates/ # Portfolio, Business, Blog templates
│ ├── start-hosting/ # Hosting form + confirmation/thank you pages
│ ├── css/ # Shared and page-specific styles
│ └── js/ # Page-specific scripts
├── routes/
│ ├── contact.js # Contact form route
│ └── startHosting.js # Hosting form route
├── server.js # Express backend entry point
├── package.json # Node dependencies & scripts
├── .gitignore
└── README.md



---

## ✨ Features

- ✅ **Responsive Templates** (Portfolio, Business, Ecommerce)
- 🛒 **E-commerce Cart System** (localStorage-based)
- 📬 **Contact + Hosting Inquiry Forms** (Node.js backend)
- 🧠 **Interactive UI Elements** (animations, modals, validations)
- 📦 **Static & Dynamic Rendering** via Express
- 🌈 Fully styled and responsive across all screen sizes

---

## 🚀 Local Development Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/novahost.git
cd novahost

npm install
npm start

Open in browser:
http://localhost:3000


| Page                | Path                               | Purpose                     |
| ------------------- | ---------------------------------- | --------------------------- |
| Home                | `/index.html`                      | NovaHost homepage           |
| Start Hosting       | `/start-hosting/start.html`        | Hosting account form        |
| Confirmation        | `/start-hosting/confirmation.html` | Shows user input            |
| Thank You           | `/start-hosting/thankyou.html`     | Final step after submission |
| Portfolio Template  | `/templates/portfolio.html`        | Sample portfolio            |
| Business Template   | `/templates/business.html`         | Sample business website     |
| Blog Template       | `/templates/blog.html`             | Sample blog layout          |
| E-commerce Homepage | `/ecommerce/index.html`            | Product grid                |
| Cart Page           | `/ecommerce/cart.html`             | Cart management             |
| Checkout Page       | `/ecommerce/checkout.html`         | Final order processing      |



---

