import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

export default function TopCustomers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await api.get("/analytics/top-customers");
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading top customers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    socket.on("newOrder", loadData);
    return () => socket.off("newOrder");
  }, []);

  if (loading) {
    return (
      <div className="loading-state">
        <div className="loading-spinner"></div>
        <p>Loading top customers...</p>
      </div>
    );
  }

  const getAvatarColor = (index) => {
    const colors = [
      'linear-gradient(135deg, #667eea, #764ba2)',
      'linear-gradient(135deg, #f093fb, #f5576c)',
      'linear-gradient(135deg, #4facfe, #00f2fe)',
      'linear-gradient(135deg, #43e97b, #38f9d7)',
      'linear-gradient(135deg, #fa709a, #fee140)'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="top-customers-card">
      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👥</div>
          <p>No customer data available</p>
        </div>
      ) : (
        <div className="customers-list">
          {users.map((user, index) => (
            <div key={user._id} className="customer-item">
              <div className="customer-info">
                <div 
                  className="customer-avatar"
                  style={{ background: getAvatarColor(index) }}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="customer-details">
                  <div className="customer-id">{user._id}</div>
                  <div className="customer-email">{user.orders} {user.orders === 1 ? "Order" : "Orders"}</div>
                </div>
              </div>
              <div className="customer-amount">₹{user.total.toLocaleString()}</div>
              <div className="customer-rank">
                <div className={`rank-badge rank-${index + 1}`}>
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}