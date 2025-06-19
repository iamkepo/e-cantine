"use client";
import React, { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";
import { modal } from "@/stores/appStore";
import AddPersonModal from "@/components/AddPersonModal";
import RemovePersonModal from "@/components/RemovePersonModal";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/useAuthStore";

const Page: React.FC = () => {
  const { theme } = useThemeStore();
  const { persons } = useCartStore();
  const { user } = useAuthStore();

  useEffect(() => {
  }, [persons]);


  return (
    <div className="tab-content mt-3">
      <div className="tab-pane fade show active">
        <div className="d-flex justify-content-between">
          <h4 className="card-title text-break">Mes amis</h4>
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={() => modal.open(<AddPersonModal />)}
          >
            <i className="bi bi-plus"></i>
            <span className="d-none d-md-inline-block ms-2 fw-bold">Ajouter un ami</span>
          </button>
        </div>
        <hr />
        <h5 className="card-title">Liste amis</h5>
        {persons?.filter((person) => person !== user?.email).length ? (
          <ul className="list-group">
            {persons.filter((person) => person !== user?.email).map((person, index) => (
              <li key={index} className={`list-group-item d-flex justify-content-between align-items-center text-bg-${theme}`}>
                {person}
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={() => modal.open(<RemovePersonModal email={person}/>)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="card-text">Vous n&apos;avez pas encore ajouté d&apos;ami.</p>
        )}
      </div>
    </div>
  );
};

export default Page;
