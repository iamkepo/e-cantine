/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
// Update the import path if AuthContext is elsewhere
import { useAuthStore } from "../stores/useAuthStore";

const LoginView: React.FC = () => {
  const login = useAuthStore((state: any) => state.login);
const authError = useAuthStore((state: any) => state.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // local error, pour les erreurs de formulaire
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      if (login) {
        await login(email, password);
      } else {
        setError("Auth provider not available.");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleSubmit} style={{ minWidth: 320, padding: 32, border: "1px solid #eee", borderRadius: 8, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <h2 style={{ marginBottom: 24 }}>Login</h2>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            autoComplete="username"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: 4 }}>Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
            autoComplete="current-password"
          />
        </div>
        {(error || authError) && (
          <div style={{ color: "#c00", marginBottom: 16 }}>{error || authError}</div>
        )}
        <button
          type="submit"
          style={{ width: "100%", padding: 10, borderRadius: 4, background: "#1976d2", color: "#fff", border: "none", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginView;
