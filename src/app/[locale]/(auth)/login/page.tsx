/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page: React.FC = () => {
  const login = useAuthStore((state: any) => state.login);
  const authError = useAuthStore((state: any) => state.error);
  const router = useRouter();
  const { lang } = useLangStore();
  const { theme } = useThemeStore();
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
        //navigate to state become
        if (router?.back) {
          router.back();
        } else {
          router.push('/'+lang+'/orders');
        }
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
    <div className="col-11 col-md-8 col-lg-6 mx-auto mt-5">
      <form onSubmit={handleSubmit} className={`card p-3 text-bg-${theme}`}>
        <h2 className="card-title">Login</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="form-control"
            autoComplete="username"
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
            autoComplete="current-password"
          />
        </div>
        {(error || authError) && (
          <div className="text-danger mb-3">{error || authError}</div>
        )}
        <button
          type="submit"
          className={`btn btn-primary w-100`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="mt-3">
          Don&apos;t have an account? 
          <Link href={'/'+lang+'/register'} className="text-decoration-underline text-primary">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Page;
