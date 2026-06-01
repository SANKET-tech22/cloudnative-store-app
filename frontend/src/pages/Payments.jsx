import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function Payments() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  const [orderId, setOrderId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    fetchOrders();
    fetchPayments();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/api/orders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await api.get("/api/payments");
      setPayments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPayment = async () => {
    try {
      await api.post("/api/payments", {
        order_id: orderId,
        amount: Number(amount),
        payment_method: paymentMethod,
      });

      setOrderId("");
      setAmount("");
      setPaymentMethod("UPI");

      fetchPayments();

      alert("Payment Created Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to create payment");
    }
  };

  const deletePayment = async (id) => {
    try {
      await api.delete(`/api/payments/${id}`);

      fetchPayments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="p-8">
        {/* Create Payment */}

        <div className="bg-slate-800 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-bold mb-4">Create Payment</h2>

          <select
            className="w-full p-3 rounded bg-slate-700 mb-4"
            value={orderId}
            onChange={(e) => {
              const selectedOrder = orders.find(
                (order) => order.id === e.target.value,
              );

              setOrderId(e.target.value);

              if (selectedOrder) {
                setAmount(selectedOrder.total_price);
              }
            }}
          >
            <option value="">Select Order</option>

            {orders.map((order) => (
              <option key={order.id} value={order.id}>
                {order.id}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={amount}
            readOnly
            className="w-full p-3 rounded bg-slate-700 mb-4"
          />

          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 rounded bg-slate-700 mb-4"
          >
            <option value="UPI">UPI</option>
            <option value="CARD">CARD</option>
            <option value="NETBANKING">NETBANKING</option>
          </select>

          <button
            onClick={createPayment}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded"
          >
            Create Payment
          </button>
        </div>

        {/* Payments List */}

        <div className="grid md:grid-cols-2 gap-6">
          {payments.map((payment) => (
            <div key={payment.id} className="bg-slate-800 p-6 rounded-xl">
              <p>
                <strong>Payment ID:</strong>
              </p>

              <p className="text-sm text-gray-400 mb-3">{payment.id}</p>

              <p>Amount: ₹{Number(payment.amount).toLocaleString()}</p>

              <p>Method: {payment.payment_method}</p>

              <p>Status: {payment.status}</p>
              <button
                onClick={() => deletePayment(payment.id)}
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
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

export default Payments;
