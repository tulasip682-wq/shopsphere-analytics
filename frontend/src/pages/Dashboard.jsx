import { useEffect, useState } from "react";
import RevenueCard from "../components/RevenueCard";
import MonthlySales from "../components/MonthlySales";
import TopCustomers from "../components/TopCustomers";
import api from "../services/api";
import socket from "../services/socket";

export default function Dashboard() {
  const [stats, setStats] = useState({
    orders: 0,
    revenue: 0,
    customers: 0,
    growth: "+12.5%"
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [realtimeUpdates, setRealtimeUpdates] = useState(0);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      window.location.href = "/";
      return;
    }

    // Load initial data
    loadStats();
    loadRecentOrders();
    
    // Set up real-time updates
    socket.on("newOrder", () => {
      setRealtimeUpdates(prev => prev + 1);
      loadStats();
      loadRecentOrders();
    });

    return () => {
      socket.off("newOrder");
    };
  }, []);

  const loadStats = async () => {
    try {
      const [revenueRes, ordersRes] = await Promise.all([
        api.get("/analytics/revenue"),
        api.get("/orders")
      ]);
      
      const ordersArray = Array.isArray(ordersRes.data) ? ordersRes.data : [];
      const totalOrders = ordersArray.length;
      
      // Calculate total revenue from completed orders
      const totalRevenue = ordersArray
        .filter(order => order.status === "completed")
        .reduce((sum, order) => sum + (order.amount || 0), 0);
      
      // Count unique customers
       const uniqueCustomers = [...new Set(ordersArray.map(order => order.customerName))].length;      
      setStats({
        revenue: revenueRes.data?.total || totalRevenue || 0,
        orders: totalOrders,
        customers: uniqueCustomers,
        growth: "+12.5%"
      });
      setLoading(false);
    } catch (error) {
      console.error("Error loading stats:", error);
      // Fallback values
      setStats({
        revenue: 129200,
        orders: 8,
        customers: 5,
        growth: "+12.5%"
      });
      setLoading(false);
    }
  };

  const loadRecentOrders = async () => {
    try {
      setOrdersLoading(true);
      const res = await api.get("/orders");
      
      if (Array.isArray(res.data) && res.data.length > 0) {
        // Sort by date (newest first) and take first 5
        const sortedOrders = res.data
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
          .slice(0, 5);
        
        setRecentOrders(sortedOrders);
      }
      setOrdersLoading(false);
    } catch (error) {
      console.error("Error loading recent orders:", error);
      setOrdersLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // Format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch (e) {
      return "N/A";
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₹${(amount || 0).toLocaleString()}`;
  };

  // Generate order ID
  const generateOrderId = (id, index) => {
    if (id && id.toString) {
      return `#ORD-${id.toString().slice(-6).toUpperCase()}`;
    }
    return `#ORD-${String(index + 1).padStart(3, '0')}`;
  };

  return (
    <div className="dashboard">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="brand">
            <button 
              className="menu-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>
            <div className="brand-logo">S</div>
            <div className="brand-text">ShopSphere</div>
          </div>
          
          <div className="nav-right">
            <div className="real-time-badge">
              <span className="pulse"></span>
              Live Updates
            </div>
            
            <button className="notification-bell">
              🔔
              <span className="notification-badge"></span>
            </button>
            
            <div className="user-profile">
              <div className="avatar">A</div>
              <div>
                <div className="font-bold">Admin User</div>
                <div className="font-sm text-gray">Administrator</div>
              </div>
            </div>
            
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <div className="dashboard-header">
          <h2>Sales Analytics Dashboard</h2>
          <p>Real-time insights and performance metrics</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-value">
              {loading ? "..." : `₹${stats.revenue.toLocaleString()}`}
            </div>
            <div className="stat-label">Total Revenue</div>
            <div className="stat-change positive">
              ↑ {stats.growth}
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">🛒</div>
            <div className="stat-value">{loading ? "..." : stats.orders}</div>
            <div className="stat-label">Total Orders</div>
            <div className="stat-change positive">
              ↑ +8.2%
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">👥</div>
            <div className="stat-value">{loading ? "..." : stats.customers}</div>
            <div className="stat-label">Active Customers</div>
            <div className="stat-change positive">
              ↑ +15.3%
            </div>
          </div>

          <div className="stat-card danger">
            <div className="stat-icon">📈</div>
            <div className="stat-value">98.5%</div>
            <div className="stat-label">Conversion Rate</div>
            <div className="stat-change positive">
              ↑ +2.1%
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Monthly Sales Overview</h3>
              <div className="chart-options">
                <button className="period-btn active">This Month</button>
                <button className="period-btn">Quarter</button>
                <button className="period-btn">Year</button>
              </div>
            </div>
            <MonthlySales />
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3>Top Customers</h3>
              <div className="badge badge-success">Top 5</div>
            </div>
            <TopCustomers />
          </div>
        </div>

        {/* Revenue Card */}
        <div style={{ marginBottom: '32px' }}>
          <RevenueCard />
        </div>

        {/* Recent Orders Table */}
        <div className="table-card">
          <div className="chart-header">
            <h3>Recent Orders</h3>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <button 
                className="btn btn-primary" 
                onClick={loadRecentOrders}
                disabled={ordersLoading}
              >
                Refresh Orders
              </button>
            </div>
          </div>
          
          <div className="table-container">
            {ordersLoading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading orders...</p>
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🛒</div>
                <p>No orders found</p>
                <p className="text-gray">No recent orders available.</p>             
                </div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={order._id || index}>
                      <td>{generateOrderId(order._id, index)}</td>
                      <td>{order.customerName}</td>
                      <td>{order.product || "Unknown Product"}</td>
                      <td>{formatCurrency(order.amount)}</td>
                      <td>
                        <span className={`status ${order.status || "pending"}`}>
                          {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : "Pending"}
                        </span>
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}