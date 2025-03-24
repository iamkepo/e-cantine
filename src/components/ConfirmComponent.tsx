import { modal } from '@renderer/stores/appStore';
import { useThemeStore } from '@renderer/stores/themeStore';
import React from 'react';

interface ConfirmComponentProps {
  title?: string;
  description?: string;
  onConfirm: () => void;
}

const ConfirmComponent: React.FC<ConfirmComponentProps> = ({ title, description, onConfirm }) => {
  const { theme } = useThemeStore();
  return (
    <div className="text-center">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="d-flex align-items-center justify-content-evenly">
        <button className={`btn btn-${theme}`} onClick={modal.close}>Annuler</button>
        <button className="btn btn-danger" onClick={onConfirm}>Confirmer</button>
      </div>
    </div>
  );
};

export default ConfirmComponent;