"use client";

import Link from "next/link";
import { useState } from "react";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from "next/navigation";
import AuthService from '@/services/authService';

const Page: React.FC = () => {
  const router = useRouter();
  const { lang } = useLangStore();
  const { theme } = useThemeStore();
  const [error, setError] = useState('');
  const [form, setForm] = useState({
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    new AuthService().register(form)
      .then((response) => {
        console.log(response);
        router.push('/' + lang + '/login');
      })
      .catch((error) => {
        console.log(error);
        setError(error.toString());
      }).finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="col-11 col-md-6 col-lg-4">
      <form onSubmit={handleSubmit} className={`card p-3 text-bg-${theme}`}>
        <h2 className="card-title text-center">Register</h2>
        <p className="text-danger">{error}</p>
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
          <Link href={'/'+lang+'/login'} className="text-decoration-underline text-primary">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
