"use client";

import { useThemeStore } from "@/stores/themeStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useLangStore } from "@/stores/langStore";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { lang } = useLangStore();

  return (
    <div>
      <h3 className="mb-3">Profile</h3>
      <div className={`card text-bg-${theme}`}>
        <div className="card-body">
          <h5 className="card-title">Profile</h5>
          <p className="card-text"> Role: {user?.role}</p>
          <p className="card-text"> Email: {user?.email}</p>

          <button type="button" className={`btn btn-danger`} onClick={() => {logout(); router.push('/'+lang)}}>
            <i className={`bi bi-box-arrow-right fs-6`}></i> Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;