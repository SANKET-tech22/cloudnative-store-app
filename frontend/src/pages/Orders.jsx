import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createOrder = async () => {
    try {
      const userId = localStorage.getItem("userId");

      await api.post("/api/orders", {
        user_id: userId,
        product_id: productId,
        quantity: Number(quantity),
      });

      fetchOrders();

      setQuantity(1);
      setProductId("");

      alert("Order Created");
    } catch (error) {
      console.error(error);
      alert("Failed to create order");
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/api/orders/${id}`);

      fetchOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to delete order");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="bg-slate-800 p-4 shadow-lg">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="p-8">
        {/* Create Order Form */}

        <div className="bg-slate-800 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-4">Create Order</h2>

          <select
            className="w-full p-3 rounded bg-slate-700 mb-4"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 rounded bg-slate-700 mb-4"
          />

          <button
            onClick={createOrder}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded"
          >
            Create Order
          </button>
        </div>

        {/* Orders List */}

        <div className="grid md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-slate-800 p-6 rounded-xl">
              <p>
                <strong>Order ID:</strong>
              </p>

              <p className="text-sm text-gray-400 mb-3">{order.id}</p>

              <p>Quantity: {order.quantity}</p>

              <p>Total Price: ₹{Number(order.total_price).toLocaleString()}</p>

              <p>Status: {order.status}</p>
              <button
                onClick={() => deleteOrder(order.id)}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
