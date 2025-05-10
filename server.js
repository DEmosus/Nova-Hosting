const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const contactRoute = require("./routes/contact");
const startHostingRoute = require("./routes/startHosting");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend files from /public
app.use(express.static(path.join(__dirname, "public" )));

// Routes
app.use("/api", contactRoute);
app.use("/", startHostingRoute);

app.use((req, res) => {
  console.log(`Catch-all hit: ${req.method} ${req.originalUrl}`);
  res.status(404).send("Route not found");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
