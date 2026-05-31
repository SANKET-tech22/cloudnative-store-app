const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use((req, res, next) => {
  console.log("GATEWAY:", req.method, req.originalUrl);
  next();
});

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:5000",
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "/api/auth"
    }
  })
);

app.use(
  "/api/products",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: {}
  })
);

app.use(
  "/api/orders",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    pathRewrite: {}
  })
);

app.use(
  "/api/payments",
  createProxyMiddleware({
    target: "http://localhost:5003",
    changeOrigin: true,
    pathRewrite: {}
  })
);

app.listen(8080, () => {
  console.log("API Gateway running on port 8080");
});