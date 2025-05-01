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
    <div className={`card text-bg-${theme} mb-3`}>
      <div className="card-body">
        <h4 className="card-title d-flex justify-content-between">Mes amis
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={() => modal.open(<AddPersonModal />)}
          >
            Ajouter un ami
          </button>
        </h4>
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
