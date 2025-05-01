"use client";
import React from "react";
import { addPerson } from "@/stores/cartStore";
import { modal } from "@/stores/appStore";

const AddPersonModal: React.FC = () => (
  <form onSubmit={e => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    addPerson(email);
    modal.close();
  }}>
    <h5 className="mb-3 text-center">Ajouter une personne</h5>
    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input type="email" className="form-control" name="email" placeholder="Ajouter une personne" required />
    </div>
    <div className="d-flex justify-content-center gap-2">
      <button type="button" className="btn btn-outline-secondary" onClick={() => modal.close()}>Annuler</button>
      <button type="submit" className="btn btn-primary">Ajouter</button>
    </div>
  </form>
);

export default AddPersonModal;
