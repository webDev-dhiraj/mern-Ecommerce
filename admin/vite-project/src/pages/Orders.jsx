import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

import tracking from "../assets/tracking.png";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (data.success) {
        setOrders(data.orders.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const newStatus = event.target.value;
      const { data } = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Order status updated");
        fetchAllOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="px-4 md:px-0">
      <h3 className="text-2xl font-semibold mb-6">Orders</h3>

      {loading ? (
        <p className="text-center text-gray-500">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6 font-bold">
          {orders.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              onStatusChange={(e) => statusHandler(e, order._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OrderCard = ({ order, onStatusChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-start border border-gray-200 p-6 rounded-lg shadow-sm text-sm text-gray-700">
      {/* Icon */}
      <img className="w-10 h-10 object-contain" src={tracking} alt="parcel" />

      {/* Items */}
      <div>
        {order.items.map((item, i) => (
          <p key={i}>
            {item.name} x {item.quantity} <span>({item.size})</span>
            {i < order.items.length - 1 && ","}
          </p>
        ))}
      </div>

      {/* Address */}
      <div className="font-semibold">
        <p>
          {order.address.firstName} {order.address.lastName}
        </p>
        <p>{order.address.street}</p>
        <p>
          {order.address.city}, {order.address.state}, {order.address.country} -{" "}
          {order.address.zipcode}
        </p>
      </div>

      {/* Phone */}
      <div>
        <p className="font-bold">{order.address.phone}</p>
      </div>

      {/* Payment */}
      <div className="font-bold">
        <p>Items: {order.items.length}</p>
        <p className="mt-1">Method: {order.paymentMethod}</p>
        <p>Payment: {order.payment ? "Done" : "Pending"}</p>
        <p>Date: {new Date(order.date).toDateString()}</p>
      </div>

      {/* Amount + Status Dropdown */}
      <div className="flex flex-col gap-2 w-full max-w-[180px] font-bold">
        <p className=" whitespace-nowrap">
          {currency}
          {order.amount}
        </p>
        <select
          onChange={onStatusChange}
          value={order.status}
          className="border border-gray-300 px-3 py-1.5 rounded text-sm bg-white shadow-sm w-full"
        >
          <option value="Order Placed">Order Placed</option>
          <option value="Packing">Packing</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivery">Delivery</option>
        </select>
      </div>
    </div>
  );
};

export default Orders;
