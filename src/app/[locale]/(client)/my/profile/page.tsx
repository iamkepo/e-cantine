"use client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLangStore } from "@/stores/langStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page: React.FC = () => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const { lang } = useLangStore();
  const { user } = useAuthStore();
  
  return (
    <div className="tab-content mt-3">
      <div className="tab-pane fade show active">
        <div className="d-flex justify-content-between">
          <h4 className="card-title text-break">Profile</h4>
          {user?.role === "admin" && (
            <Link href={'/'+lang+'/dashboard/profile'} className={`btn btn-primary`}>
              <i className={`bi bi-box-arrow-right fs-6`}></i> 
              <span className="d-none d-md-inline-block ms-2 fw-bold">Admin Profile</span>
            </Link>
          )}
        </div>
        <hr />
        <p className="card-text">Email: {user?.email}</p>
        <p className="card-text">Role: {user?.role}</p>
        <hr />
        <button type="button" className={`btn btn-danger`} onClick={() => {logout(); router.push('/'+lang)}}>
          <i className={`bi bi-box-arrow-right fs-6`}></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Déconnexion</span>
        </button>
      </div>
    </div>
  );
};

export default Page;
