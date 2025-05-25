/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
        await login(email, password, "admin");
        //navigate to state become
        router.push('/'+lang+'/dashboard');
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
    <div className="col-11 col-md-6 col-lg-4">
      <form onSubmit={handleSubmit} className={`card p-3 text-bg-${theme}`}>
        <h2 className="card-title text-center">Login</h2>
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
      </form>
    </div>
  );
};

export default Page;
