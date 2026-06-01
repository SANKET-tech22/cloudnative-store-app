require("dotenv").config();

const express = require("express");

const app = express();

const paymentRoutes =
  require("./routes/paymentRoutes");


app.use(express.json());

app.use((req,res,next)=>{
  console.log("PAYMENT REQUEST:", req.method, req.originalUrl);
  next();
});

app.use("/", paymentRoutes);

app.get("/health", (req, res) => {

  res.json({
    service: "payment-service",
    status: "healthy"
  });

});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {

  console.log(
    `Payment Service running on port ${PORT}`
  );

});