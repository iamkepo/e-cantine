import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLangStore } from "../stores/langStore";
import { useThemeStore } from "../stores/themeStore";

const RegisterView: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useLangStore();
  const { theme } = useThemeStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleError = (name: string, message: string) => {
    setError(prev => ({
      ...prev,
      [name]: message
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleError('name', '');
    handleError('email', '');
    handleError('password', '');
    handleError('confirmPassword', '');
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      handleError("name", "Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      handleError("confirmPassword", "Passwords do not match.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // In a real app, registration logic would go here
      navigate('/' + lang + '/login');
    }, 1000);
  };

  return (
    <div className="col-11 col-md-8 col-lg-6 mx-auto mt-5">
      <form onSubmit={handleSubmit} className={`card p-3 text-bg-${theme}`}>
        <h2 className="card-title">Register</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            name="name"
            className="form-control"
            autoComplete="name"
          />
          {error.name && <div className="text-danger">{error.name}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            name="email"
            className="form-control"
            autoComplete="email"
          />
          {error.email && <div className="text-danger">{error.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            name="password"
            className="form-control"
            autoComplete="new-password"
          />
          {error.password && <div className="text-danger">{error.password}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
            className="form-control"
            autoComplete="new-password"
          />
          {error.confirmPassword && <div className="text-danger">{error.confirmPassword}</div>}
        </div>
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
