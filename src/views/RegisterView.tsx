import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLangStore } from "../stores/langStore";
import { useThemeStore } from "../stores/themeStore";

const RegisterView: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLangStore();
  const { theme } = useThemeStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In a real app, registration logic would go here
      navigate('/' + lang + '/client/login');
    }, 1000);
  };

  return (
    <div className="col-6 col-md-8 col-lg-4 mx-auto">
      <form onSubmit={handleSubmit} className={`card p-3 text-bg-${theme}`}>
        <h2 className="card-title">Register</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-control"
            autoComplete="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
            autoComplete="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="form-control"
            autoComplete="new-password"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="form-control"
            autoComplete="new-password"
          />
        </div>
        {error && (
          <div className="text-danger mb-3">{error}</div>
        )}
        <button
          type="submit"
          className={`btn btn-primary w-100`}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="mt-3">
          Already have an account? 
          <Link to={'/'+lang+'/login'} className="text-decoration-underline text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterView;
