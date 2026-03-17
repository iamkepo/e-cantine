"use client";

import { logout, useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useLangStore } from "@/stores/langStore";
import Link from "next/link";

const Page: React.FC = () => {
  const { user } = useAuthStore();
  const router = useRouter();
  const { lang } = useLangStore();

  return (
    <div className="col-12">
      <div className="d-flex justify-content-between">
        <h4 className="card-title text-break">Informations</h4>
        <Link href={'/'+lang+'/profile'} className={`btn btn-primary`}>
          <i className={`bi bi-box-arrow-right fs-6`}></i> 
          <span className="d-none d-md-inline-block ms-2 fw-bold">Client Profile</span>
        </Link>
      </div>
      <hr />
      <p className="card-text"> Role: {user?.scope}</p>
      <p className="card-text"> Email: {user?.email}</p>
      <hr />
      <button type="button" className={`btn btn-danger`} onClick={() => {logout(); router.push('/'+lang)}}>
        <i className={`bi bi-box-arrow-right fs-6`}></i>   
        <span className="d-none d-md-inline-block ms-2 fw-bold">Déconnexion</span>
      </button>
    </div>
  );
};

export default Page;