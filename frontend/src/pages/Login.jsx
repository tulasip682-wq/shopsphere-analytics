import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("admin@shopsphere.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>ShopSphere</h1>
          <p>Analytics Dashboard</p>
        </div>
        
        <div className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="admin@shopsphere.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input-field"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}
          
          <button 
            className="login-btn" 
            onClick={login}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
          
          <div className="login-footer">
            <p>Demo credentials: admin@shopsphere.com / admin123</p>
            <p>
              Need help? <a href="#">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}