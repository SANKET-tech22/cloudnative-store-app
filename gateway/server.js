const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

app.use((req, res, next) => {
  console.log("GATEWAY:", req.method, req.originalUrl);
  next();
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://auth-service:5000",
    changeOrigin: true
  })
);

app.use(
  "/api/products",
  createProxyMiddleware({
    target: "http://product-service:5001",
    changeOrigin: true,
    pathRewrite: {}
  })
);

app.use(
  "/api/orders",
  createProxyMiddleware({
    target: "http://order-service:5002",
    changeOrigin: true,
    pathRewrite: {}
  })
);

app.use(
  "/api/payments",
  createProxyMiddleware({
    target: "http://payment-service:5003",
    changeOrigin: true,
    pathRewrite: {}
  })
);

app.listen(8080, () => {
  console.log("API Gateway running on port 8080");
});