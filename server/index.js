require('dotenv').config();
const express = require("express");
const connectDB = require("./utils/db");
const cors = require('cors');

// Initialize express
const app = express();
const PORT = 80;

// Middleware
app.use(cors()); // Enable pre-flight requestx
app.use(express.json({ limit: '2mb' }));  

// Routes
const apiRoutes = require("./routes/api/api");
app.use("/api", apiRoutes);

// Route for the homepage
app.get("/", (req, res) => {
  res.send("Welcome to Mind Bloom API");
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});