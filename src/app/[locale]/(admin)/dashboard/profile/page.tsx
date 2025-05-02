"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { useLangStore } from "@/stores/langStore";
import Link from "next/link";

const Page: React.FC = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { lang } = useLangStore();

  return (
    <div className="col-12">
      <h5 className="card-title d-flex justify-content-between">Informations
        <Link href={'/'+lang+'/profile'} className={`btn btn-primary`}>
          <i className={`bi bi-box-arrow-right fs-6`}></i> Client Profile
        </Link>
      </h5>
      <hr />
      <p className="card-text"> Role: {user?.role}</p>
      <p className="card-text"> Email: {user?.email}</p>

      <button type="button" className={`btn btn-danger`} onClick={() => {logout(); router.push('/'+lang)}}>
        <i className={`bi bi-box-arrow-right fs-6`}></i> Déconnexion
      </button>
    </div>
  );
};

export default Page;