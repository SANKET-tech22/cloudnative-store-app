require("dotenv").config();

console.log("AUTH SERVER FILE LOADED");

const express = require("express");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("AUTH REQUEST:", req.method, req.originalUrl);
  next();
});

app.use("/", authRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "auth-service",
  });
});


app.get("/gateway-test", (req, res) => {
  console.log("GATEWAY TEST HIT");
  res.json({
    message: "auth service reached"
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});