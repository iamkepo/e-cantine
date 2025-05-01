"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLangStore } from "@/stores/langStore";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const { logout } = useAuthStore();
  const router = useRouter();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  
  return (
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h4 className="card-title d-flex justify-content-between">Profile
          {user?.role === "admin" && (
            <Link href={'/'+lang+'/dashboard/profile'} className={`btn btn-primary`}>
              <i className={`bi bi-box-arrow-right fs-6`}></i> Admin Profile
            </Link>
          )}
        </h4>
        <hr />
        <p className="card-text">Email: {user?.email}</p>
        <p className="card-text">Role: {user?.role}</p>
        <p className="card-text">Preferences: {user?.preferences}</p>
        <hr />
        <button type="button" className={`btn btn-danger`} onClick={() => {logout(); router.push('/'+lang)}}>
          <i className={`bi bi-box-arrow-right fs-6`}></i> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Page;
