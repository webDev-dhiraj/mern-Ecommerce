import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const { backendUrl } = useContext(ShopContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileAndOrders = async () => {
      console.log("Backend URL:", backendUrl);
      try {
        const headers = { Authorization: `Bearer ${token}` };
  
        // Profile fetch
        const profileRes = await axios.get(`${backendUrl}/api/profile/get`, { headers });
        console.log("profileRes:", profileRes);
  
        if (profileRes?.data?.user) {
          setProfile(profileRes.data.user);
          setFormData(profileRes.data.user);
        } else {
          console.warn("No profile found.");
          setProfile({});
          setFormData({});
        }
  
        // Orders fetch
        const ordersRes = await axios.post(
          `${backendUrl}/api/order/userorders`,
          {},
          { headers }
        );
        console.log("ordersRes:", ordersRes);
  
        setOrders(ordersRes.data.orders || []);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const message = err.response?.data?.message || "Something went wrong";
  
          console.error(`Axios Error [${status}]:`, message);
        } else {
          console.error("Unexpected Error:", err);
        }
  
        // Optional: fallback states
        setProfile({});
        setFormData({});
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfileAndOrders();
  }, [backendUrl, token]);
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.put(
        `${backendUrl}/api/profile/update`,
        formData,
        { headers }
      );
      setProfile(res.data.user);
      setEditMode(false);
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg text-gray-600">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow bg-white">
      {/* Profile Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          {profile?.avatar ? (
            <img
              src={profile.avatar}
              alt=""
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-300 rounded-full border"></div>
          )}
          <div>
            <h2 className="text-2xl font-bold">
              {profile?.fullname || "No Name"}
            </h2>
            <p className="text-gray-600">{profile?.email || "No Email"}</p>
          </div>
        </div>
        <button
          onClick={() => setEditMode(!editMode)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editMode ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {editMode ? (
        <div className="space-y-4 mb-6">
          <input
            type="text"
            name="fullname"
            value={formData.fullname || ""}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 border rounded"
          />
         
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={handleUpdateProfile}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="mb-4">
          <p>
            <strong> Phone:</strong> {profile?.phone || "N/A"}
          </p>
          <p>
            <strong> Address:</strong> {profile?.address || "Not Provided"}
          </p>
        </div>
      )}

      <hr className="my-6" />

      {/* Orders Section */}
      <h3 className="text-xl font-semibold mb-2">🧾 Your Orders</h3>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order, idx) => (
            <li key={idx} className="border p-4 rounded bg-gray-50">
              <p>
                <strong> Order ID:</strong> {order._id}
              </p>
              <p>
                <strong> Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total || order.price || "N/A"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;
