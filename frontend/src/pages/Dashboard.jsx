import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [productsRes, ordersRes, paymentsRes] =
        await Promise.all([
          api.get("/api/products"),
          api.get("/api/orders"),
          api.get("/api/payments"),
        ]);

      setProductsCount(productsRes.data.length);
      setOrdersCount(ordersRes.data.length);
      setPaymentsCount(paymentsRes.data.length);
    } catch (error) {
      console.error("Failed to fetch dashboard counts:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">Products</h2>
            <p className="text-3xl font-bold">
              {productsCount}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">Orders</h2>
            <p className="text-3xl font-bold">
              {ordersCount}
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
            <h2 className="text-gray-400">Payments</h2>
            <p className="text-3xl font-bold">
              {paymentsCount}
            </p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/products">
            <div className="bg-blue-600 hover:bg-blue-700 p-6 rounded-xl cursor-pointer transition shadow-lg">
              <h2 className="text-xl font-bold">Products</h2>
              <p>Manage products</p>
            </div>
          </Link>

          <Link to="/orders">
            <div className="bg-green-600 hover:bg-green-700 p-6 rounded-xl cursor-pointer transition shadow-lg">
              <h2 className="text-xl font-bold">Orders</h2>
              <p>Manage orders</p>
            </div>
          </Link>

          <Link to="/payments">
            <div className="bg-purple-600 hover:bg-purple-700 p-6 rounded-xl cursor-pointer transition shadow-lg">
              <h2 className="text-xl font-bold">Payments</h2>
              <p>Manage payments</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;