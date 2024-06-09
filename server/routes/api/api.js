const express = require('express');
const router = express.Router();

// Auth routes
const authRoutes = require("./auth/auth");
router.use("/auth", authRoutes);


// User routes
const userRoutes = require("./user/user");
router.use("/user", userRoutes);

// Course routes
const courseRoutes = require("./course/course");
router.use("/course", courseRoutes);

module.exports = router;