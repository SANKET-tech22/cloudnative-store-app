require("dotenv").config();

const express = require("express");

const app = express();

const orderRoutes = require("./routes/orderRoutes")


app.use(express.json());

app.use((req,res,next)=>{
  console.log("ORDER REQUEST:", req.method, req.originalUrl);
  next();
});

app.use("/", orderRoutes);

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "order-service"
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(
    `Order Service running on port ${PORT}`
  );
});