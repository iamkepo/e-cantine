import React from "react";

type RemovePersonModalProps = {
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const RemovePersonModal: React.FC<RemovePersonModalProps> = ({ email, onConfirm, onCancel }) => (
  <div>
    <h5 className="mb-3 text-center">Supprimer une personne</h5>
    <p className="mb-3 text-center">Voulez-vous vraiment supprimer cette personne ? {email}</p>
    <div className="d-flex justify-content-center gap-2">
      <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Annuler</button>
      <button type="button" className="btn btn-danger" onClick={onConfirm}>Supprimer</button>
    </div>
  </div>
);

export default RemovePersonModal;
