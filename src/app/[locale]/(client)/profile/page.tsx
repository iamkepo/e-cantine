"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const { logout } = useAuthStore();
  const router = useRouter();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h4 className="card-title">Profile</h4>
        <p className="card-text">Email: {user?.email}</p>
        <p className="card-text">Role: {user?.role}</p>
        <p className="card-text">Preferences: {user?.preferences}</p>
        <button type="button" className={`btn btn-danger`} onClick={() => {logout(); router.push('/'+lang)}}>
          <i className={`bi bi-box-arrow-right fs-6`}></i> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Page;
