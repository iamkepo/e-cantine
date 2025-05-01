"use client";
import React from "react";
import { removePerson } from "@/stores/cartStore";
import { modal } from "@/stores/appStore";

type RemovePersonModalProps = {
  email: string;
};

const RemovePersonModal: React.FC<RemovePersonModalProps> = ({ email }) => (
  <form onSubmit={e => {
    e.preventDefault();
    removePerson(email);
    modal.close();
  }}>
    <h5 className="mb-3 text-center">Supprimer une personne</h5>
    <p className="mb-3 text-center">Voulez-vous vraiment supprimer cette personne ? {email}</p>
    <div className="d-flex justify-content-center gap-2">
      <button type="button" className="btn btn-outline-secondary" onClick={() => modal.close()}>Annuler</button>
      <button type="submit" className="btn btn-danger">Supprimer</button>
    </div>
  </form>
);

export default RemovePersonModal;
