import { useEffect, useState } from "react";
import api from "../services/api";
import socket from "../services/socket";

export default function MonthlySales() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await api.get("/analytics/monthly-sales");
      setData(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading monthly sales:", error);
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
        <p>Loading monthly sales data...</p>
      </div>
    );
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Find max amount for progress bar calculation
  const maxAmount = Math.max(...data.map(item => item.total));

  return (
    <div className="monthly-sales-card">
      {data.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <p>No monthly sales data available</p>
        </div>
      ) : (
        <div className="monthly-sales-list">
          {data.sort((a, b) => a._id - b._id).map((item) => (
            <div key={item._id} className="month-item">
              <div className="month-info">
                <div className="month-number">{item._id}</div>
                <div className="month-name">{monthNames[item._id - 1]}</div>
              </div>
              <div className="month-amount">₹{item.total.toLocaleString()}</div>
              <div className="month-progress">
                <div 
                  className="month-progress-bar" 
                  style={{ width: `${(item.total / maxAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}